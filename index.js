const inquirer = require('inquirer');
const connect = require('./db/connection');

function questions() {
  inquirer.prompt([
    {
      name: 'menu',
      type: 'list',
      message: 'what would like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department' , 'add a role' , 'add an employee' , 'update an employee role']
    },
  ])
  .then(function(response) {
    var userChoice = response.menu;
    if (response = 'view all departments') {
      viewAllDepartments();
    }
    if (response = 'view all roles') {
      viewAllRoles();
    }
    if (response = 'view all employees') {
      viewAllEmployees();
    }
    if (response = 'add a role') {
      addRole();
    }
    if (response = 'add an employee') {
      addEmployee();
    }
    if (response = 'update employee role') {
      updateEmployeeRole();
    }
    if (response = 'view all departments') {
      viewAllDepartments();
    }
  });
};
function viewAllDepartments() {
  
};

function viewAllRoles() {
  const viewAllRolesQuery = `SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
  FROM department
  JOIN roles ON department.id = roles.department_id;`;
  // creates a query that views every role, with the respective department, and salary
  connect.query(viewAllRolesQuery, function (err, results) {
    if (err) throw err;
    console.table(results);
    displayMenu();
  });
};

function viewAllEmployees() {
  const viewAllEmployeesQuery = `SELECT employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, role.salary AS salary, department.name AS department
  FROM role
  JOIN department ON role.department = department.id
  JOIN employee ON role.id = employee.id;`;
  connect.query(viewAllEmployeesQuery , function(err , results){
    if (err) throw err;
    console.table(results);
    questions()
  })
};

function addRole() {
  
};

function addEmployee() {
  connect.query("SELECT * from roles" , function(err , data){
    const roleList = data.map((role) => ({
      name: `${role.title}`,
      value: role.id
    }))
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
      const role = response.role;
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
        displayMenu();
      })
    });
    })
};

function updateEmployeeRole() {
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
            displayMenu();
          });
        });
    });
  });

};

function viewAllDepartments() {

};

questions();
