const Module = require('./Module.class');

/**
 * The file protocol module class
 */
class FileProtocolModule extends Module{

    /**
     * Gets the type of module, e.g. web module or file system
     * @returns {string}
     */
    getType() {
        return "file-protocol";
    }

}

module.exports = FileProtocolModule;
