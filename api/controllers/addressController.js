
'use strict';

const Address = require('../models/addressSchema');
const {
  addAddress,
  getLastAddress,
  getAddresses,
  getAddress,
  updateAddress,
} = require('../services/addressService');
const { getHeaderToken } = require('../services/authService');


exports.addAddress = async function(req, res) {
  const newAddress = new Address(req.body);
  newAddress.createdAt = new Date();

  const token = getHeaderToken(req);
  const success = await addAddress(token, newAddress);

  if(success) {
    const address = await getLastAddress(token);
    return res.json(address);
  } else {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Erro ao inserir endereço',
      });
  }
};

exports.getAddresses = async function(req, res) {
  const token = getHeaderToken(req);

  const addresses = await getAddresses(token);
  return res
    .json(addresses);
};

exports.getAddress = async function(req, res) {
  const token = getHeaderToken(req);
  const id = req.params.id;

  const address = await getAddress(token, id);
  
  if(address) {
    return res
      .json(address);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Endereço não encontrado.'
      });
  }
};

exports.updateAddress = async function(req, res) {
  const token = getHeaderToken(req);
  const id = req.params.id;

  const address = await updateAddress(token, id, req.body);
  
  if(address) {
    return res
      .json(address);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Endereço não encontrado.'
      });
  }
};