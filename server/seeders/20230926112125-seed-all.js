'use strict';

const { hashPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const category = require('../db/category.json') 
    const counselor = require('../db/counselor.json')
    await queryInterface.bulkInsert('Categories', category.map(el => {
      return{
        ...el,
        createdAt: new Date,
        updatedAt: new Date
      }
    }))
    await queryInterface.bulkInsert('Counselors', counselor.map(el => {
      return{
        ...el,
        password: hashPassword(el.password),
        createdAt: new Date,
        updatedAt: new Date
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categories', null, {});
     await queryInterface.bulkDelete('Counselors', null, {});

  }
};
