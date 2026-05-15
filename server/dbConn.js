const mysql = require("mysql2");

const createDBConnection = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
       ca: process.env.DB_SSL_CA
    }
  });

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });

  return db;
};

// ✅ IMPORTANT: CALL IT HERE
const db = createDBConnection();

module.exports=db;

//for local host- ca: fs.readFileSync(path.resolve(process.env.DB_SSL_CA_PATH))