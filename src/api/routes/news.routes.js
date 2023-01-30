const NewsController = require('../controllers/news.controller');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/news.schema');
const router = require('express').Router();

router.post('/', validator.validateParamsJoi(schemas.addNews), NewsController.addNews);
router.delete('/:id', NewsController.deleteNews);
router.get('/', validator.validateParamsJoi(schemas.getNews), NewsController.getAllNews);
router.get('/:id', NewsController.getNews);
router.put('/:id',  validator.validateParamsJoi(schemas.addNews), NewsController.updateNews);

module.exports = router;