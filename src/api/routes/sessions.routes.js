const SessionsController = require('../controllers/sessions.controller');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/sessions.schema');
const router = require('express').Router();

router.get('/', validator.validateParamsJoi(schemas.getSessions), SessionsController.getSessions);
router.post('/',validator.validateParamsJoi(schemas.addSessions), SessionsController.addSession);

module.exports = router;
