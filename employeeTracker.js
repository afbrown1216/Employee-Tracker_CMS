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
    if (err)throw err; 
    start();
});


function start(){
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
    .then (function (answer) {
        if (answer.view === 'View All Employees'){
            postAllEmployees();
        } else if (answer.view === 'View All Departments'){
            viewDepartment();
        }else if (answer.view === 'View All Roles'){
            viewRoles();
        }else if (answer.view === 'Add Employee'){
            addEmployee();
        }else if (answer.view === 'Add Department'){
            addDepartment();
        }else if (answer.view === 'Add Role'){
            addRole();
        }else if (answer.view === 'Update Employee Role'){
            updateRole();
        }
    })
};


function postAllEmployees(){
    //query the database for all employees 
    connection.query(
        `
        SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
        FROM 
        WHERE 
        `
        , 
        function (err,res) {
        if (err) throw err;
        console.table([
            {
                id: res.id,
                first_name: res.first_name,
                last_name: res.last_name,
                title: res.title, 
            }
        ]);
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
        
        start();
    });
};

//function to display all deparments 
    function viewDepartment(){
        //query to view all departments 
        connection.query();
    };


//function to display all roles 
    function viewRoles(){
        //query to view all roles 
        connection.query();
    };

//function to add departments 
    function addDepartment(){
        //inquirer ask what department to add 
        inquirer
        .prompt(
            {
                name: 'deptName', 
                type: 'input',
                message: 'What department would you like to add? '
            }
            )
        .then(function (answer) {
              //query to add departments 
            connection.query(
                'INSERT INTO department VALUES ? ',
                {
                    name: answer.deptName 
                }, 
                (err) => {
                    if (err) {
                        console.log('error adding department')
                    };
                    console.log('Department successfully added.')
                    start();
                }     
            );
        }); 
    };
    

//function to add roles 
    function addRole(){
        //inquirer what role to add 
        inquirer
        .prompt( 
            {
                name:'roleName',
                type: 'input', 
                message: 'What role would you like to add?'
            }, 
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            }
            //maybe for department_id ???
        )
        .then(function (answer) {
            //query to add roles
            connection.query(
                'INSERT INTO role VALUES ?,? ', 
                {
                    title: answers.roleName, 
                    salary: answers.salary
                    //department_id: mayber
                },
                (err) => {
                    if (err) {
                        console.log('error adding role')
                    };
                    console.log('Role successfully added.')
                    start();
                } 
            );
        })
   
    };
    

//function to add employees 
    function addEmployee(){
        inquirer 
        .prompt(
            {
                name:'first_name', 
                type: 'input', 
                message: 'Employee first name?'
            },
            {
                name:'last_name', 
                type: 'input', 
                message: 'Employee last name?'
            }, 
            {
                name:'roleId', 
                type: 'input', 
                message: 'What is the employees role?'
            }, 
            {
                //could be checkbox ask about 
                name:'managerId', 
                type: 'input', 
                message: 'Who is the employees manager?'
            }, 
            {
                name:'manager', 
                type: 'confirm', 
                message: 'Is this employee a manager?'
            }
        )
        //query to add employees 
        connection.query();

        insert 
    };
    

//function update employee roles 
    function updateRole(){
        //query to update an employees role
        connection.query();
    };
 
    // function for if the employee is an manager
    function manager(){

    };