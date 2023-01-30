const winston = require('winston');
const { transports, format } = winston;
const logLevel = require('../../core/enums/log-levels.enum');

const path = 'logs/server/';
const consoleFormat = format.combine(
    format.colorize(),
    format.simple(),
);

const consoleTransports = [
    new transports.Console({
        level: logLevel.INFO,
        format: consoleFormat,
    }),
]

const fileFormat = format.combine(
    format.timestamp(),
    format.printf(({ level, message, label, timestamp }) => {
        return `${(label + ' | ') && ''}${timestamp} - ${level}: ${message}`;
    })
)

const fileTransports = [
    new transports.File({
        filename: `${path}error.log`,
        level: logLevel.ERROR
    }),
    new transports.File({
        filename: `${path}warn.log`,
        level: logLevel.WARN
    }),
    new transports.File({
        filename: `${path}info.log`,
        level: logLevel.INFO,
        maxsize: 262144, // 256KB
        maxFiles: 1,
        format: fileFormat
    }),
    new transports.File({
        filename: `${path}verbose.log`,
        level: logLevel.VERBOSE
    }),
    new transports.File({
        filename: `${path}debug.log`,
        level: logLevel.DEBUG,
        maxSize: 1048576, // 1MB
        maxFiles: 5
    }),
    new transports.File({
        filename: `${path}silly.log`,
        level: logLevel.SILLY,
        maxSize: 1048576,
        maxFiles: 5,
        format: format.json()
    }),
]

const logger = winston.createLogger({
    transports: [
        ...consoleTransports,
        ...fileTransports
    ],
    format: format.prettyPrint(),
    exceptionHandlers: [
        new transports.File({
            filename: `${path}exceptions.log`
        })
    ],
    rejectionHandlers: [
        new transports.File({
            filename: `${path}rejections.log`
        })
    ]
});

module.exports = logger;