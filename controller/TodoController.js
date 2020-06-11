const db = require("../models");

let result = {
  status: "Success",
  project: "Todo crud using ORM",
  author: "Gilbert A. Masangcay",
  data: null,
};

let errorReq = {
  init: function () {
    this.errors = [];
  },
  status: "Failed",
  type: "Error Request",
  errors: [],
};

//id must be in integer
const idValidation = (id) => {
  let parseId = parseInt(id);

  if (
    typeof id === "undefined" ||
    id === "" ||
    id <= 0 ||
    isNaN(parseId) ||
    typeof id === "string"
  ) {
    return false;
  } else {
    return true;
  }
};

const getAllTodos = (req, res) => {
  db.Todo.findAll({
    include: {
      model: db.User,
      attributes: {
        //exclude: ["email"],  //-> this function is for hidding some attributes in return maybe such as password
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

  let userId = req.body.userId;
  const getUserId = () => {
    if (userId === "" || typeof userId == "undefined" || userId <= 0) {
      return null;
    } else {
      return userId;
    }
  };

  db.Todo.create({
    text: req.body.text,
    userId: getUserId(),
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

  let userId = req.body.userId;
  const getUserId = () => {
    if (userId === "" || typeof userId == "undefined" || userId <= 0) {
      return null;
    } else {
      return userId;
    }
  };

  db.Todo.update(
    {
      text: req.body.text,
      userId: getUserId(),
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

const doneTodo = (req, res) => {
  errorReq.init();
  let id = req.body.id;
  if (!idValidation(id)) {
    console.log(`id is undefined`);
    errorReq.errors.push({ message: "Invalid id type must be in integer" });
    res.json(errorReq);
  } else {
    db.Todo.update(
      {
        isDone: 1,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then((data) => {
        if (data[0] === 1) {
          res.json("Success");
        } else {
          res.json("Failed");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  }
};

const assignTodo = (req, res) => {
  errorReq.init();
  let userId = req.body.userId;

  if (!idValidation(userId)) {
    errorReq.errors.push({ message: "Invalid id type must be in integer" });
    res.send(errorReq);
  } else {
    db.Todo.update(
      {
        userId: userId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((data) => {
        if (data[0] === 1) {
          res.json("Success");
        } else {
          res.json("Failed");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  }
};

module.exports = {
  getAllTodos,
  findTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
  doneTodo,
  assignTodo,
};
