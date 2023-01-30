const { StatusCodes } = require("http-status-codes");

module.exports = class ValidationMiddleware {

    static validateParamsJoi(schema) {
        return async function (req, res, next) {
            let query, body = {};
            if (req.method === 'GET') {
                query = schema.validate(req.query);
                req.query = query.value;
            } else if (req.method === 'POST' || 'PUT') {
                body = schema.validate(req.body);
                req.body = body.value;
            }
            const result = { ...body, ...query };
            if (result.error) return res.status(StatusCodes.BAD_REQUEST).json({ error: result.error.details });
            next();
        }
    }
}