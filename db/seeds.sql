-- Info into department table
INSERT INTO department (department_name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');
-- info into the role table
INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', '180000', 1),
        ('Salesperson', '70000', 1),
        ('Engineer Lead', '1500000', 2),
        ('Software Engineer', '190000', 2),
        ('Account Manager', '15000', 3),
        ('Accountant', '185000', 3),
        ('Legal Team Lead', '350000', 4),
        ('Lawyer', '290000', 4);
-- info into the employee table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Lebron', 'James', 1, NULL),
        ('Dwayne', 'Wade', 2, NULL),
        ('Scottie', 'Pippen', 3, 1),
        ('Ty', 'Starks', 4, 2),
        ('Allen', 'Iverson', 5, 2),
        ('Ray', 'Allen', 6, 2),
        ('Kobe', 'Bryant', 7, 1),
        ('Michael', 'Jordan', 8, 1);