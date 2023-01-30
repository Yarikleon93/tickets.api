'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.hasMany(models.Tickets, {
        as: 'sessionId',
        foreignKey: 'sessionId',
        onDelete: 'CASCADE'
      });
      Session.belongsTo(models.Movies, { as: 'movie', foreignKey: 'movieId', targetKey: 'id' });
      Session.belongsTo(models.Halls, { foreignKey: 'hallId' });
    }
  };
  Session.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    date: DataTypes.DATE,
    price: DataTypes.DECIMAL,
    movieId: DataTypes.STRING,
    hallId: DataTypes.STRING,
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Sessions',
  });
  return Session;
};