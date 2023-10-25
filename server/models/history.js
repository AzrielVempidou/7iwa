'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Customer, {foreignKey: 'customerId'})
      History.belongsTo(models.Counselor, {foreignKey: 'counselorId'})

    }
  }
  History.init({
    customerId: DataTypes.INTEGER,
    counselorId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};