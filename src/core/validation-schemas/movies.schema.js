const Joi = require('joi');

module.exports.getMovie = Joi.object({
    includeSessions: Joi.boolean(),
    isActual: Joi.boolean()
});

module.exports.getMovies = Joi.object({
    status: Joi.number().min(0).max(3),
    top: Joi.number().min(0),
    offset: Joi.number().min(0),
    date: Joi.date(),
    includeSessions: Joi.boolean(),
    isActual: Joi.boolean()
});

module.exports.addMovie = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    duration: Joi.number().min(0),
    startRental: Joi.date(),
    endRental: Joi.date(),
    trailerYTvideoId: Joi.string().required(),
    description: Joi.string().required(),
    posterUrl: Joi.string().required(),
    frameUrl: Joi.string().required(),
    frameImg: Joi.string().allow(null, ''),
    posterImg: Joi.string().allow(null, '')
});