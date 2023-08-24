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

};

function viewAllDepartments() {

};

questions();
