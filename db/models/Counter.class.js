const DatabaseModel = require('../DatabaseModel.class');

class Counter extends DatabaseModel {

    constructor() {
        super('Counter', {
            model: String,
            column: String,
            sequence_value: Number
        });
    }

    async getNextValue(model, column) {
        let seq = await this.getModel().findOneAndUpdate({ model, column }, { $inc: { sequence_value: 1 } }, { upsert: true, new: true });

        return seq.sequence_value;
    }

}

module.exports = Counter;