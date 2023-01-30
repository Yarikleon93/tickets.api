const logger = require('../../utils/loggers/logger');
const movieBannerStore = require('../../infrastructure/store/movie-banner.store');

module.exports = class MovieBannerService {
    static async getMovies() {
        try {
            return movieBannerStore.getMovies();
        } catch (err) {
            logger.warn(err.message);
            return null;
        }
    }
};
