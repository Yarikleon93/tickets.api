const { StatusCodes } = require('http-status-codes');
const movieService = require('../../core/services/movie.service');
const logger = require("../../utils/loggers/logger");
const { sendErrorResponse } = require("../../utils/response");

module.exports = class MovieController {
    static async getMovie(req, res) {
        const movie = await movieService.getMovie(req.params.id, req.query);
        return res.status(StatusCodes.OK).json(movie);
    }

    static async getMovies(req, res) {
        const movies = await movieService.getMovies(req.query);
        return res.status(StatusCodes.OK).json(movies);
    }

    static async addMovie(req, res) {
        try {
            const movie = await movieService.addMovie(req.body);
            return res.status(StatusCodes.OK).json(movie);
        } catch (err) {
            logger.warn(err.message);
            return sendErrorResponse(res, StatusCodes.BAD_GATEWAY, err.message);
        }
    }

    static async updateMovie(req, res) {
        try {
            const id = req.params.id;
            const movie = await movieService.updateMovie(id, req.body);
            return res.status(StatusCodes.OK).json(movie);
        } catch (err) {
            logger.warn(err.message);
            return sendErrorResponse(res, StatusCodes.BAD_GATEWAY, err.message);
        }
    }

    static async deleteMovie(req, res) {
        try {
            const id = req.params.id;
            const movie = await movieService.deleteMovie(id);
            return res.status(StatusCodes.OK).json(movie);
        } catch (err) {
            logger.warn(err.message);
            return sendErrorResponse(res, StatusCodes.BAD_GATEWAY, err.message);
        }
    }
}