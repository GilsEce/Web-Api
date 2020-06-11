"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Task is already in use!",
        },
        validate: {
          notNull: {
            msg: "Text field is required",
          },
          notEmpty: {
            msg: "Text field cannot be empty",
          },
        },
        field: "text",
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull:true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {}
  );

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Todo;
};
