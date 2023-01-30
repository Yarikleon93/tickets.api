const QueryBuilder = require("./_queryBuilder");
const { isNil } = require("lodash");
const TicketStatus = require("../../core/enums/ticketStatuses.enum");
const { Op } = require("sequelize");

module.exports = class TicketssQueryBuilder extends QueryBuilder {
  #setActiveTickets = {
    [Op.gte]: new Date(),
  };
  #setArchiveTickets = {
    [Op.lt]: new Date(),
  };

  constructor(model, context) {
    super(model);
    this.context = context;
  }

  setStatus(status) {
    if (!isNil(status)) {
      switch (status) {
        case TicketStatus.ACTIVE_TICKETS:
          this.#setTickets(this.#setActiveTickets);
          break;
        case TicketStatus.ARCHIVE_TICKETS:
          this.#setTickets(this.#setArchiveTickets);
          break;
      }
    }
    return this;
  }

  setUserId(userId) {
    if (!isNil(userId)) {
      this.query.where.userId = userId;
    }
    return this;
  }

  setSeats(seatIds) {
    if (!isNil(seatIds) && seatIds.length > 0) {
      this.query.where.seatId = seatIds;
    }
    return this;
  }

  setSession(sessionId) {
    if (!isNil(sessionId)) {
      this.query.where.sessionId = sessionId;
    }
    return this;
  }

  #setTickets(status) {
    this.query.include = [
      {
        model: this.context.Sessions,
        required: true,
        as: "session",
        where: {
          date: status,
        },
        include: [
          {
            model: this.context.Movies,
            required: true,
            as: "movie",
          },
        ],
      },
      {
        model: this.context.Seats,
        required: true,
        as: "seat",
      },
    ];
    return this;
  }
};
