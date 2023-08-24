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
      viewAllDepartments;
    }
    if (response = 'view all employees') {

    }
    if (response = 'add a role') {

    }
    if (response = 'add an employee') {

    }
    if (response = 'update employee role') {

    }
    if (response = 'view all departments') {

    }
  });
};

questions();
