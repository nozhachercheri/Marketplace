const { User } = require("../db/index.js");

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  const { login, email } = req.body;
  // login
  User.findOne({
    where: {
      login: login,
    },
  }).then((user) => {
    if (user) {
      res.status(200).send({
        message: "Failed! login is already in use!",
        nom_prenomExists: true,
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        res.status(200).send({
          message: "Failed! Email is already in use!",
          emailExists: true,
        });
        return;
      }

      next();
    });
  });
};
