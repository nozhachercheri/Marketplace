const produitController = require("../controllers/produitController");
const { storage } = require("../middlewares/index");
const multer = require("multer");

module.exports = (app) => {
  // app.get("/getAllBoutiqueProduit/:id", produitController.getAllBoutiqueProduits);
  // app.get("/getAllProduit", produitController.getAllProduits);
  // app.get("/getProduit/:id", produitController.getProduit);
  // app.get("/getAvisOfProduit/:produitId", produitController.getAvisOfProduit);
  // app.get("/getProduitWithCategorie", produitController.getProduitWithCategorie);
  // app.put("/updateProduit/:id",multer({ storage: storage }).single("image"), produitController.updateProduit);
  // app.post(
  //   "/addProduit",
  //   multer({ storage: storage }).single("image"),
  //   produitController.AddProduit
  // );
  // app.delete("/deleteProduit/:id",produitController.deleteProduit);
  // app.post("/AddCategorie",produitController.AddCategorie);
  // app.get("/getAllCategories",produitController.getAllCategories);

  app.post(
    "/addProduit",
    multer({ storage: storage }).single("image"),
    produitController.AddProduit
  );
    app.get("/getAllCategories",produitController.getAllCategories);
    app.get("/getAllBoutiqueProduit/:id",produitController.getAllBoutiqueProduit);
    app.get("/getAvisOfProduit/:produitId",produitController.getAvisOfProduit);
    app.get("/getTaillesOfProduit/:produitId",produitController.getTaillesOfProduit);
    app.get("/getCouleursOfProduit/:produitId",produitController.getCouleursOfProduit);
    app.delete("/deleteProduit/:produitId",produitController.deleteProduit);
    app.get("/getProduistWithCategorie",produitController.getProduitWithCategorie);
    app.get("/getProduitWithArticleId",produitController.getProduitWithArticleId);
    app.get("/getProduitWithArticleIds",produitController.getProduitWithArticleIds);
    app.post("/addAvis",produitController.AddAvis);
};

