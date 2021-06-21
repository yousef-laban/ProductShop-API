const { Product } = require("../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productsList = async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      attributes: { exclude: ["creatAt", "updateAt"] },
    });
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.productsDetails = async (req, res, next) => {
  res.json(req.product);
};

exports.productsCreat = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.productsDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productsUpdate = async (req, res, next) => {
  try {
    await req.product.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
