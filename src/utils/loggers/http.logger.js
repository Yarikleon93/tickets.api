const winston = require('winston');
const { transports, format } = winston;
const logLevel = require('../../core/enums/log-levels.enum');

const path = 'logs/http/';

const infoFormat = format.printf(({ message, timestamp }) => {
    return `${timestamp} Method: ${message.method}\n` +
        `URL: ${message.originalUrl}\n` +
        `Referer: ${message.headers.referer}\n` +
        `QueryString: ${JSON.stringify(message.query)}\nParams: ${JSON.stringify(message.params)}\n` +
        `Body: ${JSON.stringify(message.body)}\n` +
        `Response: ${JSON.stringify(message.response)}\n`;
});

const fileTransports = [
    new transports.File({
        filename: `${path}info.log`,
        level: logLevel.INFO,
        maxsize: 262144, // 256KB
        maxFiles: 2,
        format: format.combine(
            format.timestamp(),
            infoFormat
        )
    }),
    new transports.File({
        filename: `${path}verbose.log`,
        level: logLevel.VERBOSE,
        maxsize: 262144, // 256KB
        maxFiles: 5,
        format: format.prettyPrint()
    })
];

const logger = winston.createLogger({
    transports: [
        ...fileTransports
    ],
});

module.exports = class HttpLogger {

    static info(req, res) {
        this.#log(logLevel.INFO, req, res);
    }

    static #log(level, req, res) {
        const { method, originalUrl, headers, query, params, body } = req;
        const { statusCode } = res;
        const data = { method, originalUrl, headers, query, params, body, response: { statusCode } };
        logger.log({ level, message: data });
    }
};