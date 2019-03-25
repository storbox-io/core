const Core = require('Core.class');
const Module = require('./module/Module.class');
const ModuleLoader = require('./module/ModuleLoader.class');
const Log = require('./util/Log.class');

global.__basedir = __dirname;
module.exports = {
    Core, Module, ModuleLoader, Log
};
