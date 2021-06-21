module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    url: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.INTEGER,
      defaultValue: 49,
      validate: {
        min: 19,
      },
    },

    description: {
      type: DataTypes.STRING,
    },
  });
};
