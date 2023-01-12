// Connecting to MySQL db
const mysql = require('mysql2');
const db = require('./db/connection');
// Connecting to CTable
const cTable = require('console.table');
const connection = require('mysql2/typings/mysql/lib/Connection');

// Start the Application
connection.connect(function (err){
    if(err) throw err; 
    console.log(
        `++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          Welcome to CompanyBuddy Where You Can View and Manage Your Employee's with Ease!
         ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
          `
        );
    initialOptions();
});

// options: view all departments, view all roles, view all employees, add a department, 
// add a role, add an employee, and update an employee role

// Initial Options Function
const initialOptions = () => [
    {
        type: 'list',
        name: 'initialOptions',
        message: 'Please make a selection from the following options:',
        choices: [],

    }
]



