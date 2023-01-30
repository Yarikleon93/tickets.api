const Joi = require('joi');

module.exports.getSessions = Joi.object({
    top: Joi.number().min(0),
    offset: Joi.number().min(0),
    date: Joi.date(),
    isActual: Joi.boolean(),
    movieId: Joi.string().guid()
});

module.exports.addSessions = Joi.object({
    date: Joi.date(),
    price: Joi.number(),
    movieId: Joi.string(),
    hallId: Joi.string()
});