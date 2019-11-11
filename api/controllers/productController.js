
'use strict';

const Product = require('../models/productSchema');
const {
  getProducts,
  getProduct,
  updateProduct,
  removeProduct,
} = require('../services/productService');
const {
  getBrandExactMatch,
} = require('../services/brandService');

exports.addProduct = async function(req, res) {
  const body = req.body;
  const product = {
    description: body.description,
    longDescription: body.longDescription,
    images: body.images,
    listPrice: body.listPrice,
    salePrice: body.salePrice, 
    stock: body.stock
  }

  const brand = await getBrandExactMatch(body.brand);
  if(!brand) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Marca é obrigatória. Utilize os serviços /brand para o correto cadastro',
      })
  }

  product.brand = brand;

  // TODO - adidcionar parentCategories. Se qualquer uma das categorias passada for inválida, retorna erro. Se não tiver categorias, não tem problema...

  const newProduct = new Product(product);
  newProduct.createdAt = new Date();
  if(!newProduct.releaseDate) {
    newProduct.releaseDate = new Date();
  }

  newProduct.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getProducts = async function(req, res) {
  const categories = await getProducts(req.query.search || '');
  return res
    .json(categories);
};

exports.getProduct = async function(req, res) {
  const id = req.params.id;

  const product = await getProduct(id);
  
  if(product) {
    return res
      .json(product);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Produto não encontrada.'
      });
  }
};

exports.updateProduct = async function(req, res) {
  const id = req.params.id;

  const success = await updateProduct(id, req.body);
  
  if(success) {
    const product = await getProduct(id);
    return res
      .json(product);
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Produto não encontrada.'
      });
  }
};

exports.removeProduct = async function(req, res) {
  const id = req.params.id;

  const product = await removeProduct(id);
  
  if(product) {
    return res
      .json({
        success: true,
        message: 'Produto removida com sucesso',
      });
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'Produto não encontrada.'
      });
  }
};