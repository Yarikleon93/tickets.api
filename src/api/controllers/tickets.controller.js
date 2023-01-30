const { StatusCodes } = require('http-status-codes');
const logger = require('../../utils/loggers/logger');
const ticketService = require('../../core/services/ticket.service');
const authService = require('../../core/services/auth.service.js');

module.exports = class TicketsController {
    static async orderTickets(req, res) {
        try {
            const { userId } = authService.getDecodedToken(req.headers.authorization);
            await ticketService.orderTickets({ ...req.body, userId });
            return res.status(StatusCodes.OK).send();
        } catch (err) {
            logger.warn(err.message);
            return res.status(StatusCodes.SEE_OTHER).json({ message: err.message });
        }
    }

    static async getTicket(req, res) {
        const ticket = await ticketService.getTicket(req.params.id);
        return res.status(StatusCodes.OK).json({ ticket });
    }

    static async getTickets(req, res) {
        const tickets = await ticketService.getTickets(req.query);
        return res.status(StatusCodes.OK).json(tickets);
    }
}