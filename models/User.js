"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
        field: "email",
      },
    },

    {
      defaultScope: {
        //  attributes: { exclude: ["email"] },  // hidding some field
      },
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo, { foreignKey: "userId" });
  };

  return User;
};
