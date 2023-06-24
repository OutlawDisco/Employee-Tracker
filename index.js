const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const util = require("util");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
  },
  console.log(`Connected to the employees_db database.`)
);

const query = util.promisify(db.query).bind(db);

async function init() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "Select one",
      name: "main menu",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    },
  ]);
  await alldepartments();
}

async function alldepartments() {
  //use db.querey to select department console.table(result)
  const results = await query("SELECT * FROM department");
  console.table(results);
}
init();
//   {
//     type: "input",
//     message: "What is your email address?",
//     name: "email",
//   },
//   {
//     type: "input",
//     message: "project name?",
//     name: "projectName",
//   },
//   {
//     type: "input",
//     message: "Please write a short description of your project",
//     name: "description",
//   },
//   {
//     type: "list",
//     message: "What kind of license should your project have?",
//     name: "license",
//     choices: ["MIT", "Apache 2.0", "other"],
//   },
//   {
//     type: "input",
//     message: "What command should be run to install dependencies?",
//     default: "npm i",
//     name: "installation",
//   },
//   {
//     type: "input",
//     message: "What command should be run to run tests?",
//     default: "npm test",
//     name: "tests",
//   },
//   {
//     type: "input",
//     message: "What does the user need to know about using the repo?",
//     default: "nothing",
//     name: "usage",
//   },
//   {
//     type: "input",
//     message:
//       "What does the user need to know about contributing to the repo?",
//     default: "please dont",
//     name: "contribute",
//   },
// ])
// .then((answers) => {
//   const mdPageContent = generateMD(answers);
