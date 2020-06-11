require('dotenv').config();
//online hosting development
module.exports = {
  // development: {
  //   username: "sql12347391",
  //   password: "eVHYnCMMlr",
  //   database: "sql12347391",
  //   host: "sql12.freesqldatabase.com",
  //   dialect: "mysql",
  //   operatorsAliases: 0,
  // },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
  },
  //local hosting development
  development: {
    username: "root",
    password: "",
    database: "best_todo_ever",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
  },
};
