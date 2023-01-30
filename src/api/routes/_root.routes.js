const router = require('express').Router();

const moviesRoutes = require('./movies.routes');
const movieBannerRoutes = require('./movie-banners.routes');
const newsRoutes = require('./news.routes');
const hallRoutes = require('./hall.routes');
const sessionsRoutes = require('./sessions.routes');
const ticketsRoutes = require('./tickets.routes');
const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const bonusesRoutes = require('./bonuses.routes');
const visitingRulesRoutes = require('./visiting-rules.routes');

router.use('/auth', authRoutes);
router.use('/movies', moviesRoutes);
router.use('/movie-banners', movieBannerRoutes);
router.use('/news', newsRoutes);
router.use('/halls', hallRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/users', usersRoutes);
router.use('/bonuses', bonusesRoutes);
router.use('/visiting-rules', visitingRulesRoutes);

module.exports = router;