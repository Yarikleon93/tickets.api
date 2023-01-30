const jwt = require("jsonwebtoken");

module.exports = class Token {
    static getToken = (userId, role) => {
        return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: process.env.TIME_FOR_TOKEN });
    }
}