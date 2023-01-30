const { Op, Sequelize } = require("sequelize");
const QueryBuilder = require("./_queryBuilder");
const { isNil } = require("lodash");
const MovieStatus = require("../../core/enums/movieStatuses.enum");
const moment = require("moment");

module.exports = class MoviesQueryBuilder extends (
  QueryBuilder
) {
  #isSessionsIncluded = false;
  #isActualSessions = false;

  constructor(model, context, config = {}) {
    super(model);
    this.context = context;
    if (config.isIncludeSessions) {
      this.#includeSessions();
    }
  }

  setStatus(status) {
    if (isNil(status)) return this;
    switch (status) {
      case MovieStatus.IN_RENT:
        this.#setInRent();
        break;
      case MovieStatus.IN_PRE_ORDER:
        this.#setInPreOrder();
        break;
      case MovieStatus.IN_SOON:
        this.#setInSoon();
        break;
      case MovieStatus.IN_ARHIVE:
        this.#setInArhive();
        break;
    }
    return this;
  }

  setActual(isActual) {
    if (isNil(isActual)) return this;
    this.#isActualSessions = isActual;
    return this;
  }

  setDate(date) {
    if (isNil(date)) return this;
    const m = moment(date);
    const [startDay, endDay] = [
      moment(date).startOf("day").add(m.utcOffset(), "m").toDate(),
      moment(date).add(1, "day").toDate(),
    ];
    const now = new Date().toUTCString();
    this.query.include = [
      {
        model: this.context.Sessions,
        where: {
          date: this.#isActualSessions
            ? {
              [Op.and]: [
                { [Op.between]: [startDay, endDay] },
                { [Op.gt]: now },
              ],
            }
            : { [Op.between]: [startDay, endDay] },
        },
        as: "sessions",
        required: this.#isSessionsIncluded,
        ...(!this.#isSessionsIncluded ? { attributes: [] } : {}),
      },
    ];
    this.query.order.push([
      { model: this.context.Sessions, as: "sessions" },
      "date",
      "ASC",
    ]);
    return this;
  }

  #includeSessions() {
    this.#isSessionsIncluded = true;
    this.query.include = [
      {
        model: this.context.Sessions,
        as: "sessions",
      },
    ];
  }

  #setInRent() {
    this.query.where.startRental = { [Op.lte]: new Date() };
    this.query.where.endRental = { [Op.gte]: new Date() };
    this.query.where.id = [Sequelize.literal("(SELECT movieId FROM Sessions)")];
  }

  #setInPreOrder() {
    this.query.where.startRental = { [Op.gte]: new Date() };
    this.query.where.id = [Sequelize.literal("(SELECT movieId FROM Sessions)")];
    this.query.raw = true;
  }

  #setInSoon() {
    this.query.where.startRental = { [Op.gte]: new Date() };
    this.query.where.id = {
      [Op.notIn]: [Sequelize.literal("(SELECT movieId FROM Sessions)")],
    };
    this.query.raw = true;
  }

  #setInArhive(){
    this.query.where.id = {
      [Op.notIn]: [Sequelize.literal("(SELECT movieId FROM Sessions)")],
    };
    this.query.where.endRental = { [Op.lte]: new Date() };
  }
};
