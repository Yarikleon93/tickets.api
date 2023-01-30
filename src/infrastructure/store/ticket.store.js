const db = require('../../core/models/index').db;
const QueryBuilder = require('../query-builders/tickets.qb');
const dbLogger = require('../../utils/loggers/db.logger');
const dbOperation = require('../../core/enums/db-operations.enum');

module.exports = class TicketStore {

    static async getTicket(id) {
        try {
            const ticket = await db.Tickets.findByPk(id);
            dbLogger.info(ticket, dbOperation.SELECT);
            return ticket;
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.SELECT);
            return null;
        }
    }

    static async getTickets(config) {
        try {
            const queryBuilder = new QueryBuilder(db.Tickets, db);
            const tickets = await (queryBuilder
                .setUserId(config.userId)
                .setStatus(config.status)
                .setSession(config.sessionId)
                .setSeats(config.seatIds)
                .top(config.top)
                .offset(config.offset)
                .build());
            dbLogger.info(tickets, dbOperation.SELECT);
            return tickets;
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.SELECT);
            return [];
        }
    }

    static async createTicket(ticket) {
        try {
            return db.Tickets.create(ticket);
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.CREATE);
            return [];
        }
    }

    static async updateTickets(data, config) {
        try {
            return db.Tickets.update({ ...data }, {
                where: { seatId: config.seatIds, sessionId: config.sessionId },
            });
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.BULK_CREATE);
            return [];
        }
    }
};