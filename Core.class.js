const Log = require('./util/Log.class');
const ModuleLoader = require('./module/ModuleLoader.class');

const Database = require('./db/Database.class');
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

        Log.info("Connect to database ...");
        this._database = new Database("127.0.0.1", "storbox", async () => {
            Log.info("Connected to database!");
        });

        let webModuleLoader = new ModuleLoader(WebModule);
        let fileProtocolModuleLoader = new ModuleLoader(FileProtocolModule);

        let webModules = await webModuleLoader.loadModules(`${__dirname}/..`);
        Log.debug(`${webModules.length} web modules loaded`);

        let fileProtocolModules = await fileProtocolModuleLoader.loadModules(`${__dirname}/..`);
        Log.debug(`${fileProtocolModules.length} file protocol modules loaded`);

        this._modules["web"] = webModules;
        this._modules["file-protocol"] = fileProtocolModules;

        for(let module of webModules) {
            module.run(`${__dirname}/../config`).then(() => Log.debug(`Started web module ${module.getName()}`));
        }
        for(let module of fileProtocolModules) {
            module.run(`${__dirname}/../config`).then(() => Log.debug(`Started file protocol module ${module.getName()}`));
        }
    }

    getDatabase() {
        return this._database;
    }

}

module.exports = new Core();
