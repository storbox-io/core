const mongoose = require('mongoose');
const fs = require('fs');
const {promisify} = require('util');
const readdir = promisify(fs.readdir);
const path = require('path');

const log = require('../util/Log.class');

class Database {

    constructor(host, db, cb, username = null, password = null) {
        log.info("Connecting to database");

        let connect = (err) => {
            if (err) {
                throw err;
            }

            this._models = {};
            this.loadModels().then(cb);
        };

        if(username !== null) {
            mongoose.connect(`mongodb://${username}:${password}@${host}:27017/${db}`, connect);
        } else {
            mongoose.connect(`mongodb://${host}:27017/${db}`, connect)
        }

        log.info("Connecting ...");
    }

    async loadModels() {
        log.info("Loading database models");
        let items = await readdir(path.join(__dirname, `models`));

        items.forEach((item) => {
            let LoadedModel = require(path.join(__dirname, `models/${item}`));
            let model = new LoadedModel();

            this._models[model.getName()] = model;
            log.debug("Loaded model " + model.getName());
        });
    }

    getModel(name) {
        return this._models[name];
    }

    getCounter() {
        return this.getModel("Counter");
    }

}

module.exports = Database;
