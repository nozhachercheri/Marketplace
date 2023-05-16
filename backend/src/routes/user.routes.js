const usercontroller = require("../controllers/userController");
const multer = require("multer");
const {
  checkDuplicateUsernameOrEmail,
  storage,
} = require("../middlewares/index");

module.exports = (app) => {
  app.post(
    "/signup-admin",
    checkDuplicateUsernameOrEmail,
    usercontroller.signUpAdmin
  );
  app.post(
    "/signup-client",
    checkDuplicateUsernameOrEmail,
    usercontroller.signUpClient
  );
  app.post(
    "/signup-boutique",
    multer({ storage: storage }).single("cover"),
    checkDuplicateUsernameOrEmail,
    usercontroller.signUpBoutique
  );

  app.post("/signin", usercontroller.signin);
  app.get("/allUsers",usercontroller.getAllUsers);
  app.delete("/deleteBoutique/:id",usercontroller.deleteBoutique);
  app.get("/allBoutiques",usercontroller.getAllBoutiques);
  app.put("/updatePwd",usercontroller.updatePwdBoutique);
  app.put("/updatePwdClient",usercontroller.updatePwdClient);
  app.get("/getBoutiqueInfos/:id",usercontroller.getBoutiqueInfos);
  app.get("/getClientInfos/:clientId",usercontroller.getClientInfos);
  app.put("/updateBoutiqueInfos",usercontroller.UpdatBoutiqueInfos);
};
