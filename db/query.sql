SELECT employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, role.salary AS salary, department.name AS department
FROM role
JOIN department ON role.department = department.id
JOIN employee ON role.id = employee.id;