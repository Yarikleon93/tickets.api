const crypto = require('crypto');

module.exports = class Crypt {
    static encryptPass = (pass) => {
        const salt = crypto.randomBytes(20).toString("hex").slice(0, 5);
        const password = crypto.createHash("md5").update(pass + salt).digest('hex');
        return { salt, password };
    }

    static isPasswordsMatch = (hash, password, salt) => {
        return this.decryptPass(password, salt) === hash;
    }

    static decryptPass = (password, salt) => {
        return crypto.createHash('md5').update(password + salt).digest('hex');
    }

}
