const Joi = require('joi');

module.exports.getHallBySession = Joi.object({
    sessionId: Joi.string().required()
});

module.exports.createHall = Joi.object({
    name: Joi.string().required(),
    seats: Joi.array().items(Joi.object({
        rowPosition: Joi.number().greater(0).less(76).required(),
        colPosition: Joi.number().greater(0).less(76).required(),
        place: Joi.number().greater(0).less(76).required(),
        row: Joi.number().greater(0).less(76).required(),
        sectorName: Joi.string()
    })).required(),
})