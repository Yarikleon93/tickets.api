const logger = require('../../utils/loggers/logger');
const movieStore = require('../../infrastructure/store/movie.store');

module.exports = class MovieService {
    static getMovie(id, config = {}) {
        try {
            return movieStore.getMovie({ id, ...config });
        } catch (err) {
            logger.warn(err.message);
            return null;
        }
    }

    static getMovies(config) {
        try {
            return movieStore.getMovies(config);
        } catch (err) {
            logger.warn(err.message);
            return [];
        }
    }

    static addMovie(movie) {
        return movieStore.addMovie(movie);
    }

    static updateMovie(id, movie) {
        return movieStore.updateMovie({ id, ...movie });
    }

    static deleteMovie(id) {
        return movieStore.deleteMovie(id);
    }
};
