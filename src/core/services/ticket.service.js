const { isNil } = require('lodash');
const sessionStore = require('../../infrastructure/store/session.store');
const ticketStore = require('../../infrastructure/store/ticket.store');
const userStore = require('../../infrastructure/store/user.store');
const userService = require('../../core/services/user.service');

module.exports = class TicketService {

    static async orderTickets(data) {
        let bonuse = 0;
        const { sessionId, seatIds, userId } = data;
        const [tickets, session, user] = await Promise.all([
            ticketStore.getTickets({ sessionId, seatIds }),
            sessionStore.getSession(sessionId),
            userStore.getUser(userId)
        ]);
        if (!tickets.length) {
            throw Error('ticket does not exists');
        }
        if (isNil(session)) {
            throw Error('session does not exists');
        }
        tickets.forEach(ticket => {
            bonuse = bonuse + ticket.price;
        });
        const [createdTickets] = await Promise.all([
            ticketStore.updateTickets({ userId }, { sessionId, seatIds }),
            userService.updateUser({ bonuse: bonuse + user.bonuse }, userId)
        ]);
        return createdTickets;
    }

    static getTicket(id) {
        return ticketStore.getTicket(id);
    }

    static getTickets(config) {
        return ticketStore.getTickets(config);
    }
};