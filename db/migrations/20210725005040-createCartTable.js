"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts", {
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: {
          model: {
            tableName: "Orders",
          },
          key: "id",
        },
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        References: {
          model: {
            tableName: "Products",
          },
          key: "id",
        },
      },

      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      total: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Carts");
  },
};
