const { StatusCodes } = require('http-status-codes');
module.exports = class Response {
  static sendErrorResponse(res, status = StatusCodes.INTERNAL_SERVER_ERROR, message = "ERROR") {
    return res.status(status).json({
      status,
      message,
    });
  };
};
