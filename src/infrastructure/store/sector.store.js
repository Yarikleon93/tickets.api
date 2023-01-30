const db = require('../../core/models/index').db;
const dbLogger = require('../../utils/loggers/db.logger');
const dbOperation = require('../../core/enums/db-operations.enum');

module.exports = class SectorsStore {

    static async createSectors(names, hallId) {
        try {
            await db.Sectors.bulkCreate(names.map(name => ({ name, hallId })))
            const createdSectors = await db.Sectors.findAll({
                where: {
                    hallId
                },
                raw: true
            });
            dbLogger.info(createdSectors, dbOperation.BULK_CREATE);
            return createdSectors;
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.BULK_CREATE);
            return null;
        }
    }
};