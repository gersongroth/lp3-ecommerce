'use strict';

const Order = require('../models/orderSchema');

// TODO - verificar melhor forma de serializar esses objetos
const mergeOrdersFromAnonymousUser = async function(anonymousUser, loggedUser) {
  if(!anonymousUser || !loggedUser) {
    console.error('[mergeOrdersFromAnonymousUser] Users cannot be null')
    return;
  }

  const anonymousOrder = findIncompleteOrderFromUser(anonymousUser);
  if(!anonymousOrder) {
    return;
  }

  // TODO - realizar merge dos pedidos. No momento, está descartando o pedido do usuário logado e usando o pedido que era do usuário anônimo
  await Order.findOneAndDelete({
    'owner._id': loggedUser._id,
    status: 'INCOMPLETE',
  });

  await Order.findOneAndUpdate({
    'owner._id': anonymousUser._id,
  },
  {
    $set: {
      owner: loggedUser,
    }
  });

  await anonymousUser.delete();
};

const findIncompleteOrderFromUser = async function (user) {
  return Order.findOne({
    'owner._id': user._id,
    status: 'INCOMPLETE',
  })
}

exports.mergeOrdersFromAnonymousUser = mergeOrdersFromAnonymousUser;
exports.findIncompleteOrderFromUser = findIncompleteOrderFromUser;