'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.hasMany(models.Sessions, {
        as: "sessions",
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
    };
  };
  Movie.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    frameUrl: DataTypes.STRING,
    type: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    startRental: DataTypes.DATE,
    endRental: DataTypes.DATE,
    posterUrl: DataTypes.STRING,
    trailerYTvideoId: DataTypes.STRING,
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Movies',
  });
  return Movie;
};