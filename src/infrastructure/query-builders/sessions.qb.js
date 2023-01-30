const { Op } = require('sequelize');
const QueryBuilder = require('./_queryBuilder');
const { isNil } = require('lodash');

module.exports = class SessionsQueryBuilder extends QueryBuilder {

    #isActual = false;

    constructor(model) {
        super(model);
        this.query.order = [['date', 'ASC']];
    }

    setActual(isActual) {
        if (isNil(isActual)) return this;
        this.#isActual = isActual;
        if (this.#isActual) {
            this.query.where.date = {
                [Op.gt]: new Date().toUTCString()
            };
        }
        return this;
    }

    setDate(date) {
        if (isNil(date)) return this;
        this.query.where.date = this.#isActual ? {
            [Op.and]: [{ [Op.gt]: new Date().toUTCString() }, { date }]
        } : date;
        console.log(this.query.where.date);
        return this;
    }

    setMovieId(id) {
        if (isNil(id)) return this;
        this.query.where.movieId = id;
        return this;
    }
}