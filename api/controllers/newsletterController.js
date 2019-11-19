'use strict';

const Newsletter = require('../models/newsletterSchema');

const isSubscribed = async (email) => {
  const subscribed = await Newsletter.findOne({ email});
  return subscribed;
}

exports.subscribe = async function(req, res) {
  const { email } = req.body;
  if(!email) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Email é obrigatório',
      });
    return;
  }

  if (await isSubscribed(email)) {
    res
      .status(200)
      .json({
        success: false,
        message: 'Email já encontra-se cadastrado!',
      });
    return;
  }

  const subscribeUser = new Newsletter({
    email,
    subscriptionDate: new Date(),
  });

  subscribeUser.save(function(err, newsletter) {
    if (err) {
      return res
        .status(400)
        .json({
          success: false,
          message: err,
        });
    }
    res.json({
      success: true,
      message: "Email cadastrado com sucesso!"
    });
  });
};

exports.unsubscribe = async function(req, res) {
  const { email } = req.body;
  if(!email) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Email é obrigatório',
      });
    return;
  }

  await Newsletter.findOneAndDelete({ email });

  res
    .status(200)
    .json({
      success: true,
      message: 'Email removido com sucesso!',
    });
};

