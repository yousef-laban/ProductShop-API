const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    url: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.INTEGER,
      defaultValue: 49,
    },

    description: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });

  // relations
  Product.associate = (models) => {
    models.Shop.hasMany(Product, {
      as: "products",
      foreignKey: "shopId", // change the column name frome ShopId tp shopId
      allowNull: false,
    });

    Product.belongsTo(models.Shop, {
      foreignKey: "shopId",
    });
  };

  return Product;
};
