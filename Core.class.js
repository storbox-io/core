const Log = require('util/Log.class');

/**
 * Core class
 */
class Core {

    constructor() {
        this._log = new Log();
    }

    /**
     * Gets the log object
     * @returns {Log}
     */
    getLog() {
       return this._log;
    }

    /**
     * Runs the application with all modules
     * @param configPath The config paths
     */
    run(configPath) {
        // To be implemented
    }

}

module.exports = new Core();
