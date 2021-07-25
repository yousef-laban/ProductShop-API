const { Order, Cart } = require("../db/models");

exports.checkout = async (req, res, next) => {
  const newOrder = await Order.create({ customerId: req.user.id });
  const cart = await req.body.map((item) => ({
    ...item,
    orderId: newOrder.id,
  }));
  const finalOrder = {
    ...newOrder.toJSON(),
    books: req.body,
  };
  await Cart.bulkCreate(cart);
  res.status(201).json(finalOrder);
};
