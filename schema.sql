DROP DATABASE IF EXISTS   employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;
USE employeeTracker_DB;

CREATE TABLE   department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT, 
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John','Doe',1),('Mike','Chan',2),('Ashley','Rodriguez',3),('Kevin','Tupik',4), ('Malia','Brown',6),('Sarah','Lourd',7),('Tom','Allen',8),('Christian','Eckenrode',9);

INSERT INTO role (title,salary,department_id);
VALUES ('Sales Lead',100000,''),('Salesperson',80000), ('Lead Engineer',150000),('Software Engineer',120000),('Accountant',125000),('Legal Team Lead',250000),('Lawyer',190000), ('Lead Engineer',150000);

INSERT INTO department (name);
VALUES ('Sales'), ('Engineering'), ('Finance'),("Legal");