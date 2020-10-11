const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'RamblingFun2020!',
    database: 'employeeTracker_DB'
});


connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    console.log("sucessful connection")
    inquirer
        .prompt({
            name: 'view',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
            ]

        })
        .then(function (answer) {
            if (answer.view === 'View All Employees') {
                postAllEmployees();
            } else if (answer.view === 'View All Departments') {
                viewDepartment();
            } else if (answer.view === 'View All Roles') {
                viewRoles();
            } else if (answer.view === 'Add Employee') {
                addEmployee();
            } else if (answer.view === 'Add Department') {
                addDepartment();
            } else if (answer.view === 'Add Role') {
                addRole();
            } else if (answer.view === 'Update Employee Role') {
                updateRole();
            }
        })
};


function postAllEmployees() {
    //query the database for all employees 
    connection.query(
        `
        SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.salary, role.title,department.name as "department"
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id;
        `,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // console.table([
            //     {
            //         id: res.id,
            //         first_name: res.first_name,
            //         last_name: res.last_name,
            //         title: res.title, 
            //     }
            // ]);
            // for (let i = 0; i < res.length; i++) {
            //     console.table([
            //         {
            //             id: res[i].id,
            //             first_name: res[i].first_name,
            //             last_name: res[i].last_name,
            //             title: res[i].title, 
            //         }
            //     ]);
            // }

            // //start();
        });
};

//function to display all deparments 
function viewDepartment() {
    //query to view all departments 
    connection.query(
        'SELECT * FROM department;',
        function (err, res) {
            if (err) throw err;
            console.table(res);
        }
    );
};


//function to display all roles 
function viewRoles() {
    //query to view all roles 
    connection.query(
        'SELECT * FROM role', 
        function (err,res) {
            if (err) throw err; 
            console.table(res);
        }
    );
};

//function to add departments 
function addDepartment() {
    //inquirer ask what department to add 
    inquirer
        .prompt([{
            name: 'name',
            type: 'input',
            message: 'What department would you like to add? '
        }])
        .then(function (answer) {
            //query to add departments 
            console.log('answer', answer)
            let query = `INSERT INTO department SET ?`

            connection.query(query, answer, function (res) {


                viewDepartment();
            })

            // connection.query(
            //     'INSERT INTO department SET ? ',
            //     answer, 
            //     (err) => {
            //         if (err) {
            //             console.log('error adding department')
            //         };
            //         console.log('Department successfully added.')
            //         viewDepartment()
            //         // start();
            //     }     
            // );
        });
};


//function to add roles 
function addRole() {
    //inquirer what role to add 
    inquirer
        .prompt([{
                name: 'roleName',
                type: 'input',
                message: 'What role would you like to add?'
            }, 
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            }
            //maybe for department_id ???
        ])
        .then(function (answer) {

            console.log("answer",answer);
            //query to add roles
            var roleName = answer.roleName;
            var salary = answer.salary;
            console.log("salary",salary);
            // var sql = "INSERT INTO role (title,salary) VALUES ?"
            connection.query(
                'INSERT INTO role (title,salary) VALUES (?,?) ', 
                // {
                //     title: answer.roleName,
                //     // salary: answer.salary
                //     //department_id: mayber
                // }
                [roleName,salary],
                (err, res) => {
                    if (err) {
                        console.log('error adding role')
                    } else {
                        console.log('Role successfully added.')
                        viewRoles();
                    };
                    
                    
                }
            );
        })

};


//function to add employees 
function addEmployee() {
    inquirer
        .prompt({
            name: 'first_name',
            type: 'input',
            message: 'Employee first name?'
        }, {
            name: 'last_name',
            type: 'input',
            message: 'Employee last name?'
        }, {
            name: 'roleId',
            type: 'input',
            message: 'What is the employees role?'
        }, {
            name: 'manager',
            type: 'confirm',
            message: 'Is this employee a manager?'
        })
    //query to add employees 
    connection.query();

    insert
};


//function update employee roles 
function updateRole() {
    connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.id as roleId FROM employee JOIN role on employee.role_id = role.id; ',
        function (err, res) {
            if (err) throw err;
            console.table(res);

            let employee = res.map(({
                id,
                first_name,
                last_name
            }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            let role = res.map (({
                roleId, 
                title, 

            }) => ({
                name: title,
                value:roleId 
            }));

            inquirer
                .prompt([{
                    name: 'title',
                    type: 'list',
                    message: 'Please selcet',
                    choices: employee
                },
                {
                    name: 'role', 
                    type: 'list', 
                    message: 'What role would you like to change it to? ',
                    choices: role
                }
            ]).then (function(answer){
                // console.log(answer);
                console.log(answer.title);
                connection.query(
                    'UPDATE role SET roleId = ? WHERE role = ?', answer, 
                    function(err){
                        if (err) {console.log("update error")}; 
                        postAllEmployees();
                    }
                )
            })
        }

    )

};