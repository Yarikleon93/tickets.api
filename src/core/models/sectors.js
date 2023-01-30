'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Sectors extends Model {
    static associate(models) {
      Sectors.hasMany(models.Seats, {
        as: "seats",
        foreignKey: 'sectorId',
        onDelete: 'CASCADE'
      });
      Sectors.belongsTo(models.Halls, { as: 'hall', foreignKey: 'hallId', targetKey: 'id' });
    }
  };
  Sectors.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    hallId: DataTypes.STRING,
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Sectors',
  });
  return Sectors;
};