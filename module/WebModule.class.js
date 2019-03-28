const Module = require('./Module.class');

/**
 * The web module class
 */
class WebModule extends Module{

    /**
     * Gets the type of module, e.g. web module or file system
     * @returns {string}
     */
    getType() {
        return "web";
    }

}

module.exports = WebModule;
