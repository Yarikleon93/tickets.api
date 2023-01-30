const Joi = require("joi");

module.exports.addNews = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
});

module.exports.getNews = Joi.object({
  top: Joi.number().min(0),
  offset: Joi.number().min(0),
  status: Joi.number().min(0).max(1),
});
