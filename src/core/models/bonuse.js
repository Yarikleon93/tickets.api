'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Bonuse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bonuse.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    total: DataTypes.INTEGER,
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes)
  }, {
    sequelize,
    modelName: 'Bonuses',
  });
  return Bonuse;
};