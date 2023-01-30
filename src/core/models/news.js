'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.hasMany(models.NewsImages, {
        as: 'images',
        foreignKey: 'newsId',
        onDelete: 'CASCADE'
      });
    }
  };
  News.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    isBreaking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'News',
  });
  return News;
};