const Joi = require('joi');

const email = Joi.string().email().required();
const fullName = Joi.string();
const birthday = Joi.date();

module.exports.update = Joi.object({
    email,
    fullName,
    birthday
});
