const Sequelize = require("sequelize").Sequelize;
//**models***/
const userModel = require("../models/user");
const clientModel = require("../models/client");
const adminModel = require("../models/admin");
const boutiqueModel = require("../models/boutique");
const produitModel = require("../models/produit");
const commandeModel = require("../models/commande");
const stockModel = require("../models/stock");
const avisModel = require("../models/avis");
const marqueModel = require("../models/marque");
const tailleModel = require("../models/taille");
const couleurModel = require("../models/couleur");


//**********/

const sequelizeConfig = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    // port: process.env.MYSQL_PORT, //-------------> change port here
    dialect: process.env.dialect,
    // operatorsAliases: false,
  }
);



async function main() {
  try {
  
    //connect to db
    await sequelizeConfig
      .authenticate()
      .then(() => {
        console.log(
          "✔ Connection has been established successfully.".underline
        );
      })
      .catch((err) => {
        console.error(`Unable to connect to the database : ${err}`.bgRed);
      });
    //create table from our models
    await sequelizeConfig
      .sync({force:false})
      .then(() => {
        console.log("tables created !".underline);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(`Unable to connect to the database : ${err}`.bgRed);
  }
}

main();

const User = userModel(sequelizeConfig, Sequelize);
const Client = clientModel(sequelizeConfig, Sequelize);
const Produit = produitModel(sequelizeConfig, Sequelize);
const Admin = adminModel(sequelizeConfig, Sequelize);
const Boutique = boutiqueModel(sequelizeConfig, Sequelize);
const Commande = commandeModel(sequelizeConfig, Sequelize);
const Stock = stockModel(sequelizeConfig, Sequelize);
const Avis = avisModel(sequelizeConfig, Sequelize);
const Taille = tailleModel(sequelizeConfig, Sequelize);
const Marque = marqueModel(sequelizeConfig, Sequelize);
const Couleur = couleurModel(sequelizeConfig, Sequelize);



//*************************************/
//oneToMany Boutique-Produit
Boutique.hasMany(Produit);
Produit.belongsTo(Boutique);

//Many to many Client-Produit
Client.belongsToMany(Produit, {
  through: Commande
});
Produit.belongsToMany(Client, {
  through: Commande
});
Client.belongsToMany(Produit, {
  through: Avis
});
Produit.belongsToMany(Client, {
  through: Avis
});
//oneToMany Produit-stock
Produit.hasMany(Stock);
Stock.belongsTo(Produit);

//oneToMany Produit-marque
Produit.hasMany(Marque);
Marque.belongsTo(Produit);


//oneToMany Produit-taille
Produit.hasMany(Taille);
Taille.belongsTo(Produit);

//oneToMany Produit-couleur
Produit.hasMany(Couleur);
Couleur.belongsTo(Produit);

module.exports = {
  User,
  Client,
  Admin,
  Boutique,
  Produit,
  Commande,
  Couleur,
  Marque,
  Taille,
  Stock,
  sequelizeConfig,
  Sequelize
};
