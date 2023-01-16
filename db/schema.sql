CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);
 
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER, 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES employee(id)
); 