const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost', 

    port: 3306, 
    
    user: 'root',

    password: ' ',
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
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager'
        ]

    })
    .then (function (answer) {
        if (answer.view === 'View All Employees'){
            postAllEmployees();
        } else if (answer.view === 'View All Employees By Department'){
            employeeByDepartment();
        }
    })
};


function postAllEmployees(){
    //query the database for all employees 
    connection.query('SELECT * FROM employees', function (err,results) {
        if (err) throw err;
        start();
    })

};

function 