module.exports = (app) => {
  const userRoutes = require("./user.routes")(app);
  const produitRoutes = require("./produit.routes")(app);
  const commandeRoutes = require("./commande.routes")(app);
};
