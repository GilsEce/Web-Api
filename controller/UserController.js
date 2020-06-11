const db = require("../models");

let result = {
  status: "Success",
  project: "Todo crud using ORM",
  author: "Gilbert A. Masangcay",
  data: null,
};

let errorReq = {
  init: function() {
    this.errors = [];
  },
  status: "Failed",
  type: "Error Request",
  errors: [],
};

const getAllUSers = (req, res) => {
  db.User.findAll({
    include: db.Todo,
    attributes: {
      exclude: ["email"], //-> this function is for hidding some attributes in return maybe such as password
    },
  })
    .then((data) => {
      result.data = data;
      res.send(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const addUser = (req, res) => {
  db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    age:req.body.age
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      errorReq.init();
      err.errors.map((e) => {
        errorReq.errors.push({ message: e.message, type: e.type });
      });
      res.json(errorReq);
    });
};

module.exports = {
  getAllUSers,
  addUser,
};
