const AuthController = require('../controllers/auth.controller');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/auth.schema');
const router = require('express').Router();

router.post('/login', validator.validateParamsJoi(schemas.login), AuthController.login);
router.post('/register', validator.validateParamsJoi(schemas.register), AuthController.register);

module.exports = router;