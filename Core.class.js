const Log = require('util/Log.class');

/**
 * Core class
 */
class Core {

    constructor() {
        this._log = new Log();
    }

    getLog() {
       return this._log;
    }

}

module.exports = new Core();
