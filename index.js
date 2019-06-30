const glob = require('glob');
const path = require('path');
const Core = require('./Core.class');

global.__basedir = __dirname;

module.exports = {
    Core
};

// Add all classes in core to exports
let names = glob.sync(__dirname + "/!(node_modules)/**/*.class.js", {absolute: false});
names = names.map(n => path.relative(__dirname, n).replace(/\\/g, "/"));
for (let name of names) {
    let fileName = name.split("/");
    fileName = fileName[fileName.length - 1].replace(".class.js", "");

    let LoadedClass = require(`./${name}`);
    module.exports[fileName] = LoadedClass;
}
