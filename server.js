const { prompt, default: inquirer } = require('inquirer');

// Connecting to MySQL db
const connection = require('./db/connection');
// Connecting to CTable
require('console.table');


// Start the Application
connection.connect(function (err) {
    if (err) throw err;
    console.log(
        `++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 Welcome to CompanyBuddy Where You Can View and Manage Your Employee's with Ease!
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
          `
    );
    initialOptions();
});

// options: , view all roles, view all employees, add a department, 
// add a role, add an employee, and update an employee role

// Initial Options Function
const initialOptions = () => {
    prompt([
        {
            type: 'list',
            name: 'initialOptions',
            message: 'Please make a selection from the following options:',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an employee', 'Update an Employee Role', 'Exit'],

        }
        //View all depts 
    ]).then(({ initialOptions }) => {
        if (initialOptions == 'View All Departments') {
            connection.promise().query(`SELECT * FROM department`)
                .then(data => console.table(data[0]))
                .then(initialOptions);
        };
        //View all roles
        if (initialOptions == 'View All Roles') {
            connection.promise().query(`SELECT title, salary, dept_name, role_id AS department 
        FROM roles
        LEFT JOIN department 
        ON roles.department_id = department.id
        LEFT JOIN employee
        ON role_id=roles.id;`)
                .then(data => console.table(data[0]))
                .then(initialOptions);
        };
        //View all Employees
        if (initialOptions == 'View All Employees') {
            connection.promise().query(` SELECT employee.first_name, employee.last_name, roles.title, roles.salary, dept_name AS department, 
        manager.first_name, manager.last_name AS manager
        FROM employee 
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id
        LEFT JOIN employee AS manager ON employee.id = manager.manager_id;`)
                .then(data => console.table(data[0]))
                .then(initialOptions);
        };
        //Add a Dept 
        if (initialOptions == "Add a Department") {
            prompt([
                {
                    type: 'input',
                    name: 'newDept',
                    message: 'What Department would you like to add?'
                }
            ]).then(newDept => {
                connection.promise().query('INSERT INTO department SET ?', newDept)
                    .then(initialOptions);
            })
        };
        // Leave the application
        if (initialOptions == 'Exit') {
            console.log(`
        +++++++++++++++++++++++++++++++++++++++++++++++
        Goodbye. Please enter cmd+C or Ctrl+C to exit.
        +++++++++++++++++++++++++++++++++++++++++++++++
            
            `);
        };
        // Add a Role 
        if (initialOptions == "Add a Role") {
            addNewRole();
        };

        // Add an Employee
        if (initialOptions == "Add an Employee") {
            addEmployee();
        };
        // Update an Employee
        if (initialOptions == "Update an Employee") {
            const updateEmployee = () => {
                [
                    {
                        type: 'list',
                        name: 'update',
                        message: 'Which employee would you like to update?',
                        choices: employee.first_name,
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: "What is the employee's new role?",
                        choices: roles,
                    }
                ]
            }
            updateEmployee();
        };
    })

}
// New Functions to initialize the last 3 options 
const addNewRole = () => {
    const departments = [];
    //get all departments and put the data in an object and then push it to the departments array
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;

        res.forEach(dep => {
            let qA = {
                name: dep.name,
                value: dep.id
            }
            departments.push(qA);
        })
    });
    let questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            choices: departments,
            message: 'Which department does this roll fall under?'
        }
    ];

    prompt(questions)
        .then(response => {
            const query = `INSERT INTO roles SET ?`;
            connection.query(query, [{ title: response.title, salary: response.salary, department_id: response.department_id }], (err, res) => {
                if (err) throw err;
                console.log('Successfully inserted ' + `${response.title}`);
                initialOptions();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

// Adding a new Employee 
const addEmployee = () => {
    connection.query(`SELECT * FROM employee`, (err, emplRes) => {
        if (err) throw err;
        const managers = [
            {
                name: '',
                value: 0
            }
        ];
        emplRes.forEach(({ first_name, last_name, id }) => {
            managers.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
        //Empty array to add new roles
        const roles = [];
        connection.query(`SELECT * FROM roles`, (err, res) => {
            if (err) throw err;
            res.forEach(role => {
                let qA = {
                    name: role.title,
                    value: role.id
                }
                roles.push(qA);
            });
            //Q's for adding a new employee
            let questions = [
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the new employee's first name?"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the new employee's last name?"
                },
                {
                    type: 'list',
                    name: 'role_id',
                    choices: roles,
                    message: "What is the role of this employee?"
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    choices: managers,
                    message: "Who manages this employee?"
                },
            ];
            prompt(questions)
                .then(response => {
                    const query = `INSERT INTO employee SET ?`;
                    connection.query(query, [{ first_name: response.first_name, last_name: response.last_name, role_id: response.role_id, manager_id: response.manager_id }], (err, res) => {
                        if (err) throw err;
                        console.log('Successfully added ' + `${response.first_name}` + " " + `${response.last_name}`);
                    });
                })
        });

    });
}
