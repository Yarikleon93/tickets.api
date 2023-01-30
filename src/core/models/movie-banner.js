'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class MovieBanner extends Model {
    static associate(models) {
      MovieBanner.belongsTo(models.Movies, {
        foreignKey: 'movieId',
        as: 'movie',
        targetKey: 'id'
      });
    }
  };
  MovieBanner.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    movieId: {
      type: DataTypes.STRING
    },
    bannerUrl: {
      type: DataTypes.STRING
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  },
    {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      sequelize,
      modelName: 'MovieBanners',
    });
  return MovieBanner;
};