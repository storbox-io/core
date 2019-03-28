const Log = require('./util/Log.class');
const ModuleLoader = require('./module/ModuleLoader.class');

const FileProtocolModule = require('./module/FileProtocolModule.class');
const WebModule = require('./module/WebModule.class');

/**
 * Core class
 */
class Core {

    constructor() {
        this._modules = {};
    }

    /**
     * Runs the application with all modules
     * @param configPath The config paths
     */
    async run(configPath) {
        Log.info("Starting storBox (version 0.1)");

        let webModuleLoader = new ModuleLoader(WebModule);
        let fileProtocolModuleLoader = new ModuleLoader(FileProtocolModule);

        let webModules = await webModuleLoader.loadModules(`${__dirname}/..`);
        Log.debug(`${webModules.length} web modules loaded`);

        let fileProtocolModules = await fileProtocolModuleLoader.loadModules(`${__dirname}/..`);
        Log.debug(`${fileProtocolModules.length} file protocol modules loaded`);

        this._modules["web"] = webModules;
        this._modules["file-protocol"] = fileProtocolModules;

        for(let module of webModules) {
            module.run(`${__dirname}/../config`);
        }
        for(let module of fileProtocolModules) {
            module.run(`${__dirname}/../config`);
        }
    }

}

module.exports = new Core();
