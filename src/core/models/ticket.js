'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Sessions, { as: 'session', foreignKey: 'sessionId', targetKey: 'id' });
      Ticket.belongsTo(models.Seats, { as: 'seat', foreignKey: 'seatId', targetKey: 'id' });
    }
  };
  Ticket.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    userId: {
      type: DataTypes.STRING,
    },
    sessionId: {
      type: DataTypes.STRING,
    },
    seatId: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Tickets',
  });
  return Ticket;
};