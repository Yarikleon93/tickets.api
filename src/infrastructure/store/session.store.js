const db = require('../../core/models/index').db;
const QueryBuilder = require('../query-builders/sessions.qb');
const dbLogger = require('../../utils/loggers/db.logger');
const dbOperation = require('../../core/enums/db-operations.enum');

module.exports = class SessionStore {

    static async getSessions(config) {
        try {
            const queryBuilder = new QueryBuilder(db.Sessions);
            const sessions = await (queryBuilder
                .setActual(config.isActual)
                .setDate(config.date)
                .setMovieId(config.movieId)
                .top(config.top)
                .offset(config.offset)
                .build());
            dbLogger.info(sessions, dbOperation.SELECT);
            return sessions;
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.SELECT);
            return [];
        }
    }

    static async getSession(id) {
        try {
            const session = await db.Sessions.findByPk(id);
            dbLogger.info(session, dbOperation.SELECT);
            return session;
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.SELECT);
            return null;
        }
    }

    static async createSession(data) {
        const { date, price, movieId, hallId } = data;
        try {
            return db.Sessions.create({
                date,
                price,
                movieId,
                hallId
            });
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.CREATE);
            return null;
        }
    }

    static async getSessionWithOnlyHall(id) {
        try {
            const session = await db.Sessions.findOne({
                where: { id },
                attributes: [],
                include: {
                    model: db.Halls,
                    as: 'Hall',
                    attributes: ['id', 'name', 'cols', 'rows'],
                    required: true,
                }
            });
            dbLogger.info(session, dbOperation.SELECT);
            return session;
        } catch (err) {
            dbLogger.warn(err.message, dbOperation.SELECT);
            return null;
        }
    }
};