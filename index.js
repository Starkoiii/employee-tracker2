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
      addRoll();
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
viewAllDepartments();

viewAllRoles();

viewAllEmployees();

addRoll();

addEmployee();

updateEmployeeRole();

viewAllDepartments();

questions();
