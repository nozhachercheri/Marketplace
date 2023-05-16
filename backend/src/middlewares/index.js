const { checkDuplicateUsernameOrEmail } = require("./verifySignup");
const { storage } = require("./uploadFile");

module.exports = {
  checkDuplicateUsernameOrEmail,
  storage,
};
