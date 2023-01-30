const { StatusCodes } = require('http-status-codes');
const MovieBannerService = require('../../core/services/movie-banner.service');

module.exports = class MovieBannersController {
    static async getMovies(req, res) {
        const topMovies = await MovieBannerService.getMovies();
        return res.status(StatusCodes.OK).json(topMovies);
    }
}