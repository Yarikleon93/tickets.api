require('dotenv').config();
const express = require('express');
const app = express();
const models = require('./core/models/index');
const cors = require('cors');
const logger = require('./utils/loggers/logger');
const loggerMiddleware = require('./api/middleware/logger.middleware');

console.log('\n\n--------------------------------');
logger.info('******* APP LAUNCH *******');

init();

async function init() {
    try {
        await models.initialize();
        logger.info(`Successful sequelize init`);
        app.use(cors());
        app.use(express.json({ limit: '50mb' }));

        app.use('/api', loggerMiddleware.request, require('./api/routes/_root.routes'));
        app.use('/api/images', express.static(__dirname + '/public/images'));

        app.listen(process.env.APP_PORT, () => {
            logger.info('Tickets.API listening at ' +
                `http://localhost:${process.env.APP_PORT}`);
        });
    } catch (err) {
        logger.error(err.message);
    }
}