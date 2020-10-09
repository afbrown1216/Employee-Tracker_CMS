
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ('John','Doe',1,3),('Mike','Chan',2,1),('Ashley','Rodriguez',3,null),('Kevin','Tupik',4,3), ('Malia','Brown',5,null),('Sarah','Lourd',6,null),('Tom','Allen',7,4),('Christian','Eckenrode',8,2);

SELECT * FROM employee;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'),("Legal");

SELECT * FROM department;

INSERT INTO role (title,salary,department_id) 
VALUES ('Sales Lead',100000,1),('Salesperson',80000,1), ('Lead Engineer',150000,2),('Software Engineer',120000,2),('Accountant',125000,3),('Legal Team Lead',250000,4),('Lawyer',190000,4), ('Lead Engineer',150000,2);

INSERT INTO manager (name)
VALUES ('John Doe'), ('Mike Chan'), ('Ashley Rodriguez'),('Sarah Lourd');

SELECT  employee.first_name, employee.last_name, role.title, department.name, role.salary
FROM employee
INNER JOIN role ON employee.id = role.id
INNER JOIN department ON department.id = role.id;
-- INNER JOIN manager ON manager.id = role.id;
