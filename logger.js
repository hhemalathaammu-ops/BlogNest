const fs = require("fs");

const logMessage = (message) => {
    const time = new Date().toISOString();

    const log = `[${time}] ${message}\n`;

    fs.appendFileSync("server.log", log);
};

module.exports = logMessage;