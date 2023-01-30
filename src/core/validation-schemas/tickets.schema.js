const Joi = require('joi');
// todo: add guid() after db set with guid ids
module.exports.orderTicket = Joi.object({
    sessionId: Joi.string().required(),
    seatIds: Joi.array().items(Joi.string()).required(),
});

module.exports.getTickets = Joi.object({
    status: Joi.number().min(0).max(2),
    sessionId: Joi.string(),
    userId: Joi.string().guid(),
    top: Joi.number().min(0),
    offset: Joi.number().min(0),
});