'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model { };
  Cinema.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes)
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Cinemas',
  });
  return Cinema;
};