const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const util = require("util");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employees_db database.`)
);

const query = util.promisify(db.query).bind(db);

async function init() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "Select one",
      name: "mainMenue",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "delete a department",
        "delete a role",
        "delete an employee",
      ],
    },
  ]);
  if (answers.mainMenue === "view all departments") {
    allDepartments();
  } else if (answers.mainMenue === "view all roles") {
    allRoles();
  } else if (answers.mainMenue === "view all employees") {
    allEmployees();
  } else if (answers.mainMenue === "add a department") {
    addDepartment();
  } else if (answers.mainMenue === "add a role") {
    addRole();
  } else if (answers.mainMenue === "add an employee") {
    addEmployee();
  } else if (answers.mainMenue === "update an employee role") {
    updateEmployeeRole();
  } else if (answers.mainMenue === "delete a department") {
    deleteDepartment();
  } else if (answers.mainMenue === "delete a role") {
    deleteRole();
  } else if (answers.mainMenue === "delete an employee") {
    deleteEmployee();
  }
}
//funtions to view departments, roles, and employees
async function allDepartments() {
  const results = await query("SELECT * FROM department");
  console.table(results);
  init();
}
async function allRoles() {
  const results = await query("SELECT * FROM role");
  console.table(results);
  init();
}
async function allEmployees() {
  const results = await query("SELECT * FROM employee");
  console.table(results);
  init();
}
//functions to add departments, roles and employees
async function addDepartment() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "add department name",
      name: "name",
    },
  ]);
  const results = await query("INSERT INTO department SET ?", answers);
  console.table(results);
  init();
}

async function addRole() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "add role title",
      name: "title",
    },
  ]);
  const results = await query("INSERT INTO role SET ?", answers);
  console.table(results);
  init();
}
async function addEmployee() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "first name of new employee?",
      name: "first_name",
    },
    {
      type: "input",
      message: "last name of new employee?",
      name: "last_name",
    },
  ]);
  const results = await query(
    "INSERT INTO employee(first_name, last_name) SET ?",
    answers
  );
  console.table(results);
  init();
}

async function updateEmployeeRole() {
  const employees = await query("SELECT * FROM employee");
  const role = await query("SELECT * FROM role");
  const employeeArray = employees.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
  }));
  const roleArray = role.map((empRole) => ({
    name: `${empRole.title} ${empRole.salary}`,
    value: empRole.id,
  }));
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "choose a department to delete",
      name: "id",
      choices: employeeArray,
    },
  ]);
  const updateEmp = await query("UPDATE employees SET?", answers);
}

async function deleteDepartment() {
  const results = await query("SELECT * FROM department");
  const departmentArray = results.map((dept) => ({
    name: dept.name,
    value: dept.id,
  }));
  console.log(departmentArray);
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "choose a department to delete",
      name: "id",
      choices: departmentArray,
    },
  ]);
  const deleteRES = await query(
    "DELETE FROM department WHERE id = ?",
    answers.id
  );
  console.table(deleteRES);
  init();
}

async function addRole() {}

async function addEmployee() {}

init();
