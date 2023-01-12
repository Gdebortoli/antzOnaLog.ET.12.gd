const connection = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'password',
      database: 'employee_db',
    },
    console.log('Connected to the employee database.')
  );
// exports to server.js file
  module.exports = connection; 