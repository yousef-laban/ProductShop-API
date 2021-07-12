const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopsList = async (req, res, next) => {
  try {
    const allShops = await Shop.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(allShops);
  } catch (error) {
    next(error);
  }
};

exports.shopsDetails = async (req, res, next) => {
  res.json(req.shop);
};

// exports.shopsCreat = async (req, res, next) => {
//   try {
//     if (req.file)
//       req.body.url = `http://${req.get("host")}/media/${req.file.filename}`;
//     // req.body.url = `http://${req.get("host")}/${req.file.path}`; work the same

//     const newShop = await Shop.create(req.body);
//     res.status(201).json(newShop);
//   } catch (error) {
//     next(error);
//   }
// };

exports.shopsDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.shopsUpdate = async (req, res, next) => {
  try {
    if (req.file)
      req.body.url = `http://${req.get("host")}/media/${req.file.filename}`;
    await req.shop.update(req.body);
    res.status(201).json(req.shop);
  } catch (error) {
    next(error);
  }
};

exports.productsCreat = async (req, res, next) => {
  try {
    if (req.file)
      req.body.url = `http://${req.get("host")}/media/${req.file.filename}`;
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
