const DatabaseModel = require('../DatabaseModel.class');
const HashUtils = require('../../util/HashUtils.class');

class User extends DatabaseModel {

    constructor() {
        super('User', {
            email: String,
            username: String,
            usernameL: String,
            uuid: String,
            password: String,
            loginToken: String,
            role: String
        });
    }

    async login(login, password, adminNeeded = false) {
        let doc = await this.getModel().find({$or: [{email: login.toLowerCase()}, {usernameL: login.toLowerCase()}]}).exec();
        if(doc.length > 0) {
            doc = doc[0];
            console.log(password + " " + doc.password);
            let pwOk = await HashUtils.verify(password, doc.password);
            console.log(pwOk);
            if (adminNeeded) {
                return doc !== null && pwOk && doc.role === "Admin";
            }
            return doc !== null && pwOk;
        } else {
            return false;
        }
    }

    _encodeHTML(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

    async addUser(email, username, password) {
        username = this._encodeHTML(username);

        let docs = await this.getModel().find({$or: [{email: email.toLowerCase()}, {usernameL: username.toLowerCase()}]}).exec();

        if (docs.length > 0) {
            return false;
        } else {
            let UserModel = this.getModel();
            let user = new UserModel({
                email: email.toLowerCase(),
                username,
                usernameL: username.toLowerCase(),
                password: HashUtils.hashPassword(password),
                role: "User"
            });

            await user.save();
            return true;
        }
    }

    async createNewToken(login) {
        let doc = await this.getModel().findOne({$or: [{email: login.toLowerCase()}, {usernameL: login.toLowerCase()}]}).exec();
        if (doc !== null) {
            let token = doc.loginToken === undefined ? HashUtils.createLoginToken() : doc.loginToken;
            doc.loginToken = token;
            await doc.save();
            return token;
        } else {
            return false;
        }
    }

    async getUserByName(name, adminNeeded = false) {
        let doc = await this.getModel().findOne({ingameName: name}).select("-usernameL -password -uuid -password -loginToken").exec();

        if (doc !== null) {
            return adminNeeded ? (doc.role === "Admin" ? doc : null) : doc;
        }
        return null;
    }

    async getUserByToken(token, adminNeeded = false) {
        if(token === false) {
            return null;
        }

        let doc = await this.getModel().findOne({loginToken: token}).select("-password -loginToken").exec();

        if (doc !== null) {
            return adminNeeded ? (doc.role === "Admin" ? doc : null) : doc;
        }
        return null;
    }

    async getAllUsers(withEmail = false) {
        let docs = await this.getModel().find().select("-admin -password -loginToken" + (!withEmail ? " -email" : "")).exec();

        if (docs.length !== 0) {
            return docs;
        } else {
            return null;
        }
    }

    async getAllUsernames() {
        return await this.getModel().find().select("username").exec();
    }

}

module.exports = User;
