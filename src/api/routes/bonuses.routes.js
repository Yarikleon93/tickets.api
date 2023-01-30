const BonusesController = require('../controllers/bonuses.controller');
const router = require('express').Router();

router.get('/', BonusesController.getUserBonuses);

module.exports = router;
