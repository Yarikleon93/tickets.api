const MovieBannerController = require('../controllers/movie-banners.controller');
const router = require('express').Router();

router.get('/', MovieBannerController.getMovies);

module.exports = router;