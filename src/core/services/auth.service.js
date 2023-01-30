const crypt = require('../../utils/crypt');
const token = require('../../utils/jwt.token');
const _ = require('lodash');
const userStore = require('../../infrastructure/store/user.store');
const jwt = require("jsonwebtoken");

module.exports = class AuthService {
    static async login(email, password) {
        const user = await userStore.getUserByEmail(email);
        if (!user) throw new Error('User is not found');
        if (!crypt.isPasswordsMatch(user.password, password, user.salt))
            throw new Error('Incorrect password');
        return {
            user: _.omit(user, ['password']),
            token: token.getToken(user.id, user.role),
        }
    }

    static async register(data) {
        if (await userStore.getUserByEmail(data.email)) {
            throw new Error('User exists');
        }
        let { salt, password } = crypt.encryptPass(data.password);
        let user = {
            email: data.email,
            salt,
            password,
        };
        user = await userStore.createUser(user);
        return {
            user: _.omit(user, ['password']),
            token: token.getToken(user.id, user.role),
        };
    }

    static getDecodedToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
};