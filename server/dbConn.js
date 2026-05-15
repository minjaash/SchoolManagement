const mysql = require("mysql2");
//const fs = require("fs"); for local host
//const path = require("path"); for localhost
//db connection

function createDBConnection() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
     ssl: {
           //for local host- ca: fs.readFileSync(path.resolve(process.env.DB_SSL_CA_PATH))
             ca: process.env.DB_SSL_CA
           }
  });

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:",err);
      return;
    }
    console.log("Connected to MySQL database");
  });

  return db;
}

module.exports = createDBConnection;

