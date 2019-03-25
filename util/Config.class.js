const toml = require('toml');
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

/**
 * A simple TOML config wrapper class
 */
class Config {

    /**
     * Initializes a TOML config instance
     * @param configPath The directory where the config is in
     * @param fileName The file name
     * @param loadDirectly true when config should be loaded directly
     */
    constructor(configPath, fileName, loadDirectly = true) {
        this.filePath = `${configPath}/${fileName}.toml`;
        if(loadDirectly) {
            this.loadFile().then();
        }
    }

    async loadFile() {
        let data = await readFile(this.filePath);
        let parsed = toml.parse(data);

        this._data = parsed;
    }

    getConfig() {
        return this._data;
    }

}
