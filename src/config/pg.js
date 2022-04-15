const { Pool } = require('pg');
const { DATABASE_URL } = require('../helpers/env');

// pools will use environment variables
// for connection information
const db = new Pool({
  connectionString: DATABASE_URL,
  // host: PGHOST,
  // user: PGUSER,
  // password: PGPASSWORD,
  // database: PGDATABASE,
  // port: PGPORT,
});

// check connection
db.connect((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = db;
