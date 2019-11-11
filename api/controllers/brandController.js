
'use strict';

const Brand = require('../models/brandSchema');
const {
  getBrandies,
  getBrand,
  updateBrand,
  removeBrand,
} = require('../services/brandService');

exports.addBrand = async function(req, res) {
  const newBrand = new Brand(req.body);
  newBrand.createdAt = new Date();

  newBrand.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getBrandies = async function(req, res) {
  const categories = await getBrandies(req.query.search || '');
  return res
    .json(categories);
};

exports.getBrand = async function(req, res) {
  const id = req.params.id;

  const brand = await getBrand(id);
  
  if(brand) {
    return res
      .json(brand);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Marca não encontrada.'
      });
  }
};

exports.updateBrand = async function(req, res) {
  const id = req.params.id;

  const success = await updateBrand(id, req.body);
  
  if(success) {
    const brand = await getBrand(id);
    return res
      .json(brand);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Marca não encontrada.'
      });
  }
};

exports.removeBrand = async function(req, res) {
  const id = req.params.id;

  const brand = await removeBrand(id);
  
  if(brand) {
    return res
      .json({
        success: true,
        message: 'Marca removida com sucesso',
      });
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Marca não encontrada.'
      });
  }
};