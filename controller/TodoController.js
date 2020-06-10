const db = require("../models");

let result = {
  status: "Success",
  project: "Todo crud using ORM",
  author: "Gilbert A. Masangcay",
  data: null,
};

let errorReq = {
  init: function(){
    this.errors = [];
  },
  status: "Failed",
  type: "Error Request",
  errors: [],
};

const getAllTodos = (req, res) => {
  db.Todo.findAll({
    include: {
      model: db.User,
      attributes: {
        exclude: ["email"],  //-> this function is for hidding some attributes in return maybe such as password 
      },
    },
  }).then((todos) => {
    result.data = todos;
    res.json(result);
  });
};

const findTodo = (req, res) => {
  errorReq.init();
  db.Todo.findAll({
    where: {
      id: req.params.id,
    },
  }).then((todo) => {
    if (todo.length >= 1) {
      result.data = todo;
      res.send(result);
    } else {
      errorReq.errors.push({ message: "ID not found in record" });
      res.send(errorReq);
    }
  });
};

const addTodo = (req, res) => {
  errorReq.init();
  let user_id = req.body.user_id;
  const getUserId = () => {
    if (user_id === "" || typeof user_id == "undefined" || user_id <= 0) {
      return null;
    } else {
      return user_id;
    }
  };

  db.Todo.create({
    text: req.body.text,
    user_id: getUserId(),
  })
    .then((submittedTodo) => {
      result.data = submittedTodo;
      res.json(result);
    })
    .catch((err) => {
      err.errors.map((e) => {
        errorReq.errors.push({ message: e.message, type: e.type });
      });

      res.send(errorReq);
    });
};

const updateTodo = (req, res) => {
  errorReq.init();
  db.Todo.update(
    {
      text: req.body.text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (data[0] === 1) {
        db.Todo.findAll().then((todos) => {
          result.data = todos;
          res.json(result);
        });
      } else {
        errorReq.errors.push({ message: "ID not found in record" });
        res.send(errorReq);
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const deleteTodo = (req, res) => {
  errorReq.init();
  db.Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).then((length) => {
    if (length >= 1) {
      db.Todo.findAll().then((todos) => {
        result.data = todos;
        res.json(result);
      });
    } else {
      errorReq.errors.push({ message: "ID not found in record" });
      res.send(errorReq);
    }
  });
};

const deleteAllTodos = (req, res) => {
  errorReq.init();

  let confirmPass = "AFCT-1H1-2HH-12-DFGQ"; //static password, but you can create a dynamic pass that store in db

  if (req.query.pass === confirmPass) {
    db.Todo.destroy({
      where: {},
    }).then((length) => {
      if (length > 1) {
        db.Todo.findAll().then((todos) => {
          result.data = todos;
          res.json(result);
        });
      } else {
        errorReq.errors.push({ message: "Todo record is empty" });
        res.send(errorReq);
      }
    });
  } else {
    errorReq.errors.push({ message: "Password is incorrect" });
    res.send(errorReq);
  }
};

module.exports = {
  getAllTodos,
  findTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
