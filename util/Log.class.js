/**
 * Util class for logging actions
 */
class Log {

    constructor() {
        this.debugMode = false;
    }

    /**
     * Set whether debug message should be shown or not
     * @param {Boolean} value The new value
     */
    setDebugMode(value) {
        this.debugMode = value;
    }

    /**
     * Log an info message
     * @param msg The message
     */
    info(msg) {
        console.log('\x1b[32m[INFO ' + getDateTime() + '] \x1b[37m' + msg);
    }

    /**
     * Log a debug message
     * @param msg The message
     */
    debug(msg) {
        if(this.debugMode) {
            console.log('\x1b[36m[DEBUG ' + getDateTime() + '] \x1b[37m' + msg);
        }
    }

    /**
     * Log an error message
     * @param msg The message
     */
    error(msg) {
        console.log('\x1b[31m[ERROR ' + getDateTime() + '] \x1b[37m' + msg);
    }

    /**
     * Log an warn message
     * @param msg The message
     */
    warn(msg) {
        console.log('\x1b[33m[WARNING ' + getDateTime() + '] \x1b[37m' + msg);
    }

}

// Private functions

function getDateTime() {
    const date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
}

module.exports = new Log();
