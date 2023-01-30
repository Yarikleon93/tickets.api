const TicketsController = require('../controllers/tickets.controller');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/tickets.schema');
const router = require('express').Router();

router.put('/', validator.validateParamsJoi(schemas.orderTicket), TicketsController.orderTickets);
router.get('/:id', TicketsController.getTicket);
router.get('/', validator.validateParamsJoi(schemas.getTickets), TicketsController.getTickets);

module.exports = router;
