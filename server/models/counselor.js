'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counselor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Counselor.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Counselor.hasMany(models.History, {foreignKey: 'counselorId'})

    }
  }
  Counselor.init({
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fee: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    rating: DataTypes.VIRTUAL,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Counselor',
  });
  return Counselor;
};