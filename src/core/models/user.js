'use strict';
const Role = require('../enums/roles.enum');
const timeloger = require('./default-timestamp');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Tickets, {
        as: 'userId',
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  };
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    salt: DataTypes.STRING,
    bonuse: DataTypes.INTEGER,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: Role.USER,
    },
    createdAt: timeloger(sequelize, DataTypes),
    updatedAt: timeloger(sequelize, DataTypes),
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Users',
  });
  return User;
};