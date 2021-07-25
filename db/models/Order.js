module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {});

  // relation
  Order.associate = (models) => {
    models.User.hasMany(Order, {
      foreignKey: "customerId",
    });

    Order.belongsTo(models.User, {
      foreignKey: "customerId",
    });
  };

  return Order;
};
