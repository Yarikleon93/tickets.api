const { isNil } = require('lodash');
const winston = require('winston');
const { transports, format } = winston;
const logLevel = require('../../core/enums/log-levels.enum');

const path = 'logs/db/';

const infoFormat = format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
        const { operation } = message;

        return `${timestamp} - ${level}: [${operation}]`;
    })
);

const fileTransports = [
    new transports.File({
        filename: `${path}warn.log`,
        level: logLevel.WARN,
    }),
    new transports.File({
        filename: `${path}info.log`,
        level: logLevel.INFO,
        format: infoFormat
    }),
    new transports.File({
        filename: `${path}verbose.log`,
        level: logLevel.VERBOSE,
        maxsize: 262144, // 256KB
        maxFiles: 10,
    })
];

const logger = winston.createLogger({
    transports: [
        ...fileTransports,
        new transports.Console({
            level: logLevel.WARN,
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
    )
});

module.exports = class dbLogger {

    static info(data, operation = null) {
        this.#log(logLevel.INFO, data, operation);
    }

    static warn(data, operation = null) {
        this.#log(logLevel.WARN, data, operation);
    }

    static #log(level, data, operation) {

        const message = {};
        message.operation = operation ?
            operation.toUpperCase() : 'UNKNOWN';

        if (isNil(data)) {
            message.data = 'Not found';
        } else {
            data = Array.isArray(data) ? data : [data];
            message.data = data.map(node => node.get ? node.get({ plain: true }) : node);
        }
        logger.log({ level, message });
    }
};