const { StatusCodes } = require('http-status-codes');
const sessionService = require('../../core/services/session.service');

module.exports = class SessionsController {
    static async getSessions(req, res) {
        const sessions = await sessionService.getSessions(req.query);
        res.status(StatusCodes.OK).json(sessions);
    }

    static async addSession(req, res) {
        const session = await sessionService.createSession(req.body);
        res.status(StatusCodes.OK).json(session);
    }
}