'use strict';

const Brand = require('../models/brandSchema');

exports.getBrandies = async function(term) {
  return Brand.find( { $or:
    [
      { "description": { "$regex": term, "$options": "i" } },
    ]}); 
}

exports.getBrand = async function(brandId) {
  try {
    return await Brand.findById(brandId);
  } catch(e) {
    console.error('Erro buscando marca', e);
  }
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
