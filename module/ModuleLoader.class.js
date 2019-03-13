const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);

const Core = require('../Core.class');
const Log = Core.getLog();

/**
 * A class to load modules of a specific type
 */
class ModuleLoader {

    /**
     * Creates a module loader
     * @param moduleType The specified module type
     */
    constructor(moduleType) {
        this.moduleType = moduleType;
    }

    /**
     * Loads a module under a specific path
     * @param path The path
     * @param skipInvalid Skips the error message when the module is invalid
     * @returns {Promise<*>} The module or `null` when invalid
     */
    async loadModule(path, skipInvalid) {
        let module = require(path);

        if(module.prototype instanceof this.moduleType) {
            return module;
        } else if(!skipInvalid) {
            if(module.getName !== undefined) {
                Log.error(`The module ${module.getName()} is not a valid module of this type.`);
            } else {
                Log.error(`The module under the path ${path} is not a valid module.`);
            }
        }

        return null;
    }

    /**
     * Loads all modules in a specific directory
     * @param dirPath Directory path
     * @returns {Promise<Array<*>>} The module array
     */
    async loadModules(dirPath) {
        let items = await readdir(dirPath, { withFileTypes: true });

        let modules = [];

        let i = 0;
        for(let item of items) {
            if(item.isDirectory()) {
                let module = await this.loadModule(`${dirPath}/${item.name}/index.js`);
                if(module !== null) {
                    modules.push(module);
                }
            }
        }

        return modules;
    }

}

module.exports = ModuleLoader;
