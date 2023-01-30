'use strict';
const {
  Model
} = require('sequelize');
const timeloger = require('./default-timestamp');
module.exports = (sequelize, DataTypes) => {
  class NewsImages extends Model {
    static associations(models) {
      NewsImages.belongsTo(models.News, { foreignKey: 'newsId' });
    }
  };
  NewsImages.init({
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'NewsImages',
  });
  return NewsImages;
};