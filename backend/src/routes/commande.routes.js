const commandeController = require("../controllers/commande.Controller");

module.exports = (app) => {
  app.post("/addCommande",commandeController.AddCommande);
  app.delete("/deleteCommande/:idC",commandeController.DeleteConfirmedCommande);
  app.delete("/DeletePendingCommande/:idC",commandeController.DeletePendingCommande);
  app.put("/confirmAllCommandeProduits/:clientId",commandeController.confirmAllCommandeProduits);
  app.get("/getFactureForProduit/:idC",commandeController.getFactureForProduit);
  app.get("/AllCommandeForClients/:clientId",commandeController.AllCommandeForClients);
  app.get("/AllConfirmedCommandeForClient/:clientId",commandeController.AllConfirmedCommandeForClient);
  app.put("/confirmCommandeFromBoutique/:idC",commandeController.confirmCommandeFromBoutique);
  app.get("/getBoutiqueCommandeForConfirm/:id",commandeController.getBoutiqueCommandeForConfirm);
  app.get("/getBoutiqueConfirmedCommande/:id",commandeController.getBoutiqueConfirmedCommande);
};
