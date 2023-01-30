const HallController = require('../controllers/hall.controller');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/halls.schema.js');
const router = require('express').Router();

router.get('/:sessionId', HallController.getHallBySession);
router.get('/', HallController.getHalls);
router.post('', validator.validateParamsJoi(schemas.createHall), HallController.createHall);

module.exports = router;
