const httpLogger = require('../../utils/loggers/http.logger');

module.exports = class LoggerMiddleware {

    static async request(req, res, next) {
        if (req.method === 'OPTION') {
            next();
        }
        if (req.originalUrl.slice(0, 12) !== '/api/images/') {
            res.on("finish", function () {
                httpLogger.info(req, res);
            });
        }
        next();
    }
}