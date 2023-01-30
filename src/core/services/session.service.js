const sessionStore = require('../../infrastructure/store/session.store');

module.exports = class SessionService {
    static getSessions(config) {
        return sessionStore.getSessions(config);
    }

    static createSession(model) {
        return sessionStore.createSession(model);
    }
};
