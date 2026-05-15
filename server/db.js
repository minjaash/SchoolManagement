const createDBConnection = require("./dbconn");

const db = createDBConnection();

module.exports = db;