const mongoose = require('mongoose');

class DatabaseModel {

    constructor(name, schema) {
        this.name = name;
        this.schema = new mongoose.Schema(schema);
        this.model = mongoose.model(this.name, this.schema);
    }

    getSchema() {
        return this.schema;
    }

    getModel() {
        return this.model;
    }

    getName() {
        return this.name;
    }

    async getCount() {
        return await this.getModel().countDocuments({}).exec();
    }

}

module.exports = DatabaseModel;