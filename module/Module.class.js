/**
 * The module class
 */
class Module {

    /**
     * Gets the name of the module
     * @returns {string} The name of the module
     */
    getName() {
        return "";
    }

    /**
     * Gets the type of module, e.g. web module or file system
     * @returns {string}
     */
    getType() {
        return "";
    }

    /**
     * Start the module with the module path
     * @param configPath
     */
    run(configPath) {

    }

}

module.exports = Module;
