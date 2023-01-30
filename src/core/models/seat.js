'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.hasMany(models.Tickets, {
        as: 'seatId',
        foreignKey: 'seatId',
        onDelete: 'CASCADE'
      })
      Seat.belongsTo(models.Sectors, { as: 'sector', foreignKey: 'sectorId', targetKey: 'id' });
    }
  };
  Seat.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    rowPosition: DataTypes.INTEGER,
    colPosition: DataTypes.INTEGER,
    place: DataTypes.INTEGER,
    row: DataTypes.INTEGER,
    hallId: {
      type: DataTypes.STRING,
    },
    sectorId: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Seats',
  });
  return Seat;
};