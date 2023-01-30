const Joi = require('joi');

const email = Joi.string().email().required();
const password = Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required();

module.exports.login = Joi.object({
    email,
    password
});

module.exports.register = Joi.object({
    email,
    password
}); 