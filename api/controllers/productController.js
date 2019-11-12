
'use strict';

const Product = require('../models/productSchema');
const {
  getProducts,
  getProduct,
  updateProduct,
  removeProduct,
  getProductNews,
  getProductBestSellers,
} = require('../services/productService');
const {
  getBrandExactMatch,
} = require('../services/brandService');

const getProductFromRequest = async (req) => {
  const body = req.body;
  const product = {
  };
  [
    'description',
    'longDescription',
    'images',
    'listPrice',
    'salePrice',
    'stock'
  ].forEach((element) => {
    if(body[element]) {
      product[element] = body[element];
    }
  });

  const brand = await getBrandExactMatch(body.brand);
  if(brand) {
    product.brand = brand;
  }
  
  // TODO - adicionar parentCategories. Se qualquer uma das categorias passada for inválida, retorna erro. Se não tiver categorias, não tem problema...

  return product;
}

exports.addProduct = async function(req, res) {

  const newProduct = new Product(await getProductFromRequest(req));
  
  if(!newProduct.brand) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Marca é obrigatória. Utilize os serviços /brand para o correto cadastro',
      })
  }

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
  const productToUpdate = await getProductFromRequest(req);
  const success = await updateProduct(id, productToUpdate);
  
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

exports.getProductNews = async function(req, res) {
  const products = await getProductNews();
  return res.json(products);
}

exports.getProductBestSellers = async function(req, res) {
  const products = await getProductBestSellers();
  return res.json(products);
}
