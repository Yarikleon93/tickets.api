const MovieController = require('../controllers/movie.controller');
const validator = require('../middleware/validator.middleware');
const schemas = require('../../core/validation-schemas/movies.schema');
const router = require('express').Router();
const AuthMidleware = require('../middleware/auth.middleware');
const Role = require('../../core/enums/roles.enum');

router.get('/:id', validator.validateParamsJoi(schemas.getMovie), MovieController.getMovie);
router.get('/', validator.validateParamsJoi(schemas.getMovies), MovieController.getMovies);
router.post('/', validator.validateParamsJoi(schemas.addMovie), AuthMidleware.checkRole(Role.ADMIN), MovieController.addMovie);
router.put('/:id', validator.validateParamsJoi(schemas.addMovie), AuthMidleware.checkRole(Role.ADMIN), MovieController.updateMovie);
router.delete('/:id', AuthMidleware.checkRole(Role.ADMIN), MovieController.deleteMovie);

module.exports = router;