const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
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
  });

  SequelizeSlugify.slugifyModel(Shop, {
    source: ["name"],
  });

  // relation
  Shop.associate = (models) => {
    models.User.hasMany(Shop, {
      as: "Shops",
      foreignKey: "userId", // change the column name frome ShopId tp shopId
      allowNull: false,
    });

    Shop.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Shop;
};
