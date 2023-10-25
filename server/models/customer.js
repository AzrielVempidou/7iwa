'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.History, {foreignKey: 'customerId'})

    }
  }
  Customer.init({
    email: {
      type:DataTypes.STRING,
      unique: {msg: "Email must be unique"},
      allowNull: false,
      validate:{
        isEmail: {msg: "Invalid email format"},
        notNull: {msg: "Email is required"},
        notEmpty: {msg: "Email is required"}
      }
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false,
     validate:{
       notNull: {msg: "Password is required"},
       notEmpty: {msg: "Password is required"}
     }
    },
    role: DataTypes.STRING,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "gender is required"},
        notEmpty: {msg: "gender is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
    hooks:{
      beforeCreate(customer,option){
        customer.password = hashPassword(customer.password)
      }
    }
  });
  return Customer;
};