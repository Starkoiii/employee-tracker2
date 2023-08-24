const inquirer = require('inquirer');
const connect = require('./db/connection');
function questions() {
  inquirer.prompt([
    {
      name: 'homescreen',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },
  ])
    .then((response) => {
      var userChoice = response.homescreen;
      if (userChoice == "View All Employees") {
        ViewAllEmployees();
      } else if (userChoice == "Add Employee") {
        AddEmployee();
      } else if (userChoice == "Update Employee Role") {
        UpdateEmployeeRole();
      } else if (userChoice == "View all Roles") {
        ViewAllRoles();
      } else if (userChoice == "Add Role") {
        AddRole();
      } else if (userChoice == "View All Departments") {
        ViewAllDepartments();
      } else if (userChoice == "Add Department") {
        AddDepartment();
      } else if (userChoice == "Quit") {
        return;
      }
    });
};
function ViewAllEmployees() {
  console.log("You chose the view employee option");
  const viewAllEmployeesQuery = `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
  FROM employees
  JOIN roles ON employees.role_id = roles.id
  JOIN department ON roles.department_id = department.id
  LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`;
  connect.query(viewAllEmployeesQuery, function (err, results) {
    if (err) throw err;
    console.table(results);
    questions();
  });
};
function AddEmployee() {
  console.log("You chose the add employee route");
  connect.query('Select * from roles', (err, data) => {
    const roleList = data.map((role) => ({
      name: `${role.title}`,
      value: role.id
    }));
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter employee first name!"
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter employee last name!"
      },
      {
        type: "list",
        name: "roleID",
        message: "Please select employee role!",
        choices: roleList
      },
      {
        type: "list",
        name: "manager",
        message: "Please select employee's manager!",
        choices: ['Lebron James', 'Dwayne Wade']
      },
    ])
      .then((response) => {
        const firstName = response.firstName;
        const lastName = response.lastName;
        const role = response.roleID;
        const manager = response.manager;
        if (manager == "Lebron James") {
          mgNum = 1;
        } else if (manager == "Dwayne Wade") {
          mgNum = 2;
        };
        const addEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        connect.query(addEmployee, [firstName, lastName, role, mgNum], function (err, results) {
          if (err) throw err;
          console.log("Employee added successfully!");
          questions();
        })
      });
  });
};
function UpdateEmployeeRole() {
  connect.query('Select * from employees', (err, data) => {
    const eeList = data.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id
    }));
    connect.query('Select * from roles', (err, data) => {
      const roleList = data.map((role) => ({
        name: `${role.title}`,
        value: role.id
      }));
      inquirer.prompt([
        {
          type: "list",
          name: "eeName",
          message: "Please select which employee you would like to update",
          choices: eeList
        },
        {
          type: "list",
          name: "eeRole",
          message: "Please select the employee's new role",
          choices: roleList
        },
      ])
        .then((response) => {
          eeID = response.eeName;
          eeRole = response.eeRole;
          const updateEmployee = `UPDATE employees
          SET role_id = ?
          WHERE id= ?`;
          connect.query(updateEmployee, [eeRole, eeID], function (err, results) {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            questions();
          });
        });
    });
  });
};
function ViewAllRoles() {
  const viewAllRolesQuery = `SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
  FROM department
  JOIN roles ON department.id = roles.department_id;`;
  connect.query(viewAllRolesQuery, function (err, results) {
    if (err) throw err;
    console.table(results);
    questions();
  });
};
function AddRole() {
  connect.query('Select * from department', (err, data) => {
    const deptList = data.map((dept) => ({
      name: `${dept.department_name}`,
      value: dept.id
    }));
    inquirer.prompt([
      {
        type: "input",
        name: "newRole",
        message: "Please enter the new role"
      },
      {
        type: "number",
        name: "salary",
        message: "Please enter the new role's salary"
      },
      {
        type: "list",
        name: "deptID",
        message: "Please select the new role's department",
        choices: deptList
      },
    ])
      .then((response) => {
        const newRole = response.newRole;
        const salary = response.salary;
        const dept = response.deptID;
        const addRole = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        connect.query(addRole, [newRole, salary, dept], function (err, results) {
          if (err) throw err;
          console.log("Role added successfully!");
          questions();
        });
      });
  });
};
function ViewAllDepartments() {
  const viewAllDepts = `SELECT * FROM department`;
  connect.query(viewAllDepts, function (err, results) {
    if (err) throw err;
    console.table(results);
    questions();
  });
};
function AddDepartment() {
  console.log("What is the name of the department?");
  inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Please enter the new department"
    },
  ])
    .then((response) => {
      const deptName = response.deptName;
      const addDept = `INSERT INTO department (department_name) VALUES (?)`;
      connect.query(addDept, [deptName], function (err, results) {
        if (err) throw err;
        console.log("New department added successfully!");
        questions();
      });
    });
};
questions();