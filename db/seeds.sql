INSERT INTO department
    (dept_name, id)
VALUES
    ('Management', 2),
    ('Human Resources', 3),
    ('Billing and Accounting', 4),
    ('Reception', 5),
    ('IT', 6);

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Buisness Owner', 150000, 2), 
    ('Office Manager', 60000, 2),
    ('Chief HR Officer', 75000, 3),
    ('HR Specialist', 65000, 3),
    ('Billing Specialist', 75000, 4), 
    ('Accountant', 75000, 4), 
    ('Receptionist', 55000, 5), 
    ('Office Assistant', 55000, 5), 
    ('Computer Systems Manager', 85000, 6),
    ('IT Technician', 66000, 5);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Diana', 'Prince', 1, null), 
    ('Indiana', 'Jones', 2, 1), 
    ('Sherlock', 'Holmes', 3, 1),
    ('Benoit', 'Blanc', 4, 3),
    ('Sarah', 'Marshall', 5, 1),
    ('Lara', 'Croft', 6, 5),
    ('Natasha', 'Romanov', 7, 2),
    ('Tony', 'Stark', 8, 2),
    ('Elle', 'Woods', 9, 1),
    ('Bruce', 'Wayne', 10, 9);
   
  