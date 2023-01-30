const UsersController = require('../controllers/users.controller');
const router = require('express').Router();
const AuthMidleware = require('../middleware/auth.middleware');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/users.schema');

router.get('/:id', AuthMidleware.isAuthorized, UsersController.getUser);
router.put('/', AuthMidleware.isAuthorized, validator.validateParamsJoi(schemas.update), UsersController.updateUser);

module.exports = router;