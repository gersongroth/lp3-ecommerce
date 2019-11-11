'use strict';
const mongoose = require('mongoose');
const Brand = require('../models/brandSchema');

exports.getBrands = async function(term) {
  return Brand.find({ "description": { "$regex": term, "$options": "i" }});
}

const getBrandById = async (brandId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return;
    }
    return await Brand.findById(brandId);
  } catch(e) {
    console.error('Erro buscando marca', e);
  }
}

exports.getBrand = async function(brandId) {
  return await getBrandById(brandId);
}

exports.updateBrand = async function(brandId, brandUpdate) {
  try {
    const update = {
      description: brandUpdate.description,
      image: brandUpdate.image,
    }
    return await Brand.findByIdAndUpdate(brandId, update);
  } catch(e) {
    console.error('Erro atualizando marca', e);
  }
}

exports.removeBrand = async function(brandId) {
  try {
    return await Brand.findByIdAndRemove(brandId);
  } catch(e) {
    console.error('Erro removendo marca', e);
  }
}

exports.getBrandExactMatch = async function(term) {
  let brand = await Brand.findOne({ "description": term });
  if(brand) {
    return brand;
  }
  return await getBrandById(term);
}