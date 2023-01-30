"use strict";
const { Model } = require("sequelize");
const timeloger = require("./default-timestamp");
module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    static associate(models) {
      Hall.hasMany(models.Seats, {
        as: "hallId",
        foreignKey: "hallId",
        onDelete: "CASCADE",
      });
    }
  }
  Hall.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      cols: {
        type: DataTypes.INTEGER,
      },
      rows: {
        type: DataTypes.INTEGER,
      },
      createdAt: timeloger(sequelize, DataTypes),
      updatedAt: timeloger(sequelize, DataTypes),
    },
    {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      sequelize,
      modelName: "Halls",
    }
  );
  return Hall;
};
