const crypto = require('crypto');

class HashUtilsClass {

    async hashPassword(pw) {
        return crypto.createHash('sha256').update(pw).digest('hex');
    }

    createLoginToken() {
        return crypto.randomBytes(16).toString("hex");
    }

    async verify(pw, hash) {
        return await this.hashPassword(pw) === hash;
    }

}

module.exports = new HashUtilsClass();
