'use strict';
const { v4: uuidv4 } = require('uuid');
const logger = require('../../utils/loggers/logger');
const dbLogger = require('../../utils/loggers/db.logger');
const dbOperation = require('../../core/enums/db-operations.enum');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const mysql = require('mysql2/promise');
const db = {};


async function initialize() {
  const { host, port, username, password, database, use_env_variable } = config;
  const connection = await mysql.createConnection({ host, port, user: username, password });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  logger.info(`Database ${database} connected`);

  const defaultSettings = {
    ...config,
    dialectOptions: {
      decimalNumbers: true
    },
    define: {
      hooks: {
        beforeCreate(instance) {
          return instance.id = uuidv4();
        },
        beforeBulkCreate(instances) {
          return instances.map((model) => { model.id = uuidv4(); return model });
        },
        afterCreate(instance) {
          dbLogger.info( instance, dbOperation.CREATE);
        },
        afterBulkCreate(instances) {
          dbLogger.info( instances, dbOperation.BULK_CREATE);
        },
        afterUpdate(instance) {
          dbLogger.info( instance, dbOperation.UPDATE);
        },
        afterDestroy(instance) {
          dbLogger.info( instance, dbOperation.REMOVE);
        }
      }
    }
  }
  const sequelize = use_env_variable ?
    new Sequelize(process.env[use_env_variable], defaultSettings) :
    new Sequelize(database, username, password, defaultSettings);

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  return sequelize.sync();
}

module.exports.initialize = initialize;
module.exports.db = db;