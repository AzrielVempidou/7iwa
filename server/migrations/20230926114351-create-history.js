'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Customers",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      counselorId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Counselors",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      rating: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};