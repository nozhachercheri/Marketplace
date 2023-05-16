const { Produit, Boutique, User, Commande, sequelizeConfig, Sequelize } = require("../db/index.js");



exports.AddCommande = async (req, res) => {
  const { tailleId, couleurId, qty, clientId, produitId } = req.body;
  try {
    const Commande = await sequelizeConfig.query(
      ` insert into commandes  (tailleId,couleurId,date,qty,clientIdClient,produitId)
      VALUES(${tailleId},${couleurId},getDate(),${qty},${clientId},${produitId}) `,
      { type: Sequelize.QueryTypes.INSERT }
    );
    return res.status(200).send(Commande);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.DeleteConfirmedCommande = async (req, res) => {
  const id = req.params.idC
  try {
    const Commande = await sequelizeConfig.query(
      ` 
      DELETE FROM commandes where idC = ${id} and etat = 1  `,
      { type: Sequelize.QueryTypes.DELETE }
    );
    return res.status(200).send(Commande);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.DeletePendingCommande = async (req, res) => {
  const id = req.params.idC
  try {
    const Commande = await sequelizeConfig.query(
      ` 
      DELETE FROM commandes where idC = ${id} and etat = 0  `,
      { type: Sequelize.QueryTypes.DELETE }
    );
    return res.status(200).send(Commande);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.confirmAllCommandeProduits = async (req, res) => {
  const clientId = req.params.clientId
  try {
    const Commande = await sequelizeConfig.query(
      ` 
      update commandes set etat = 1 where clientIdClient = ${clientId} and etat = 0 `,
      { type: Sequelize.QueryTypes.DELETE }
    );
    return res.status(200).send(Commande);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.AllCommandeForClients = async (req, res) => {
  const clientId = req.params.clientId
  try {
    const Commandes = await sequelizeConfig.query(
      ` SELECT
      c.idC,
      p.prod_name,
      t.nomT as taille,
      cou.nomC as couleur,
      p.prix,
      c.qty,
      c.date,
      p.article_id
      FROM commandes c
      JOIN produits p
      ON p.id = c.produitId
      JOIN tailles t
      ON t.id = c.tailleId
      JOIN couleurs cou
      ON cou.id = c.couleurid
      JOIN clients cl
      ON cl.idClient = c.clientIdClient
      where c.etat = 0 and c.clientIdClient = ${clientId} `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Commandes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.AllConfirmedCommandeForClient = async (req, res) => {
  const clientId = req.params.clientId
  try {
    const Commandes = await sequelizeConfig.query(
      ` SELECT
      c.idC,
      p.prod_name,
      t.nomT as taille,
      cou.nomC as couleur,
      p.prix,
      c.qty,
      c.date,
      CASE 
      when c.etat = 1 then 'En attente la confirmation de la boutique'
      ELSE 'Confirmée'
      end as etat,
      p.article_id
      FROM commandes c
      JOIN produits p
      ON p.id = c.produitId
      JOIN tailles t
      ON t.id = c.tailleId
      JOIN couleurs cou
      ON cou.id = c.couleurid
      JOIN clients cl
      ON cl.idClient = c.clientIdClient
      where c.etat not like '%0%' and c.clientIdClient   = ${clientId} `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Commandes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.confirmCommandeFromBoutique = async (req, res) => {
  const id = req.params.idC
  try {
    const Commande = await sequelizeConfig.query(
      ` 
      update commandes set etat = 2 where idC = ${id}  and etat = 1 `,
      { type: Sequelize.QueryTypes.DELETE }
    );
    return res.status(200).send(Commande);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBoutiqueCommandeForConfirm = async (req, res) => {
  const id = req.params.id
  try {
    const Commandes = await sequelizeConfig.query(
      ` 
      SELECT
      c.idC,
      p.prod_name as produit,
      p.prix,
      t.nomT,
	  cou.nomC,
      u.login as Client,
      u.email,
      c.qty,
      c.idC,
      c.etat,
      b.idBoutique
      FROM commandes c
      JOIN produits p
      ON p.id = c.produitId
	  JOIN tailles t
	  ON t.id = c.tailleId
	  join couleurs cou
	  ON cou.id = c.couleurid
      JOIN boutiques b
      ON b.idBoutique = p.boutiqueIdBoutique
      JOIN users u
      ON u.userId = c.clientIdClient
      where b.idBoutique = ${id} and c.etat in (1,2) `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Commandes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getBoutiqueConfirmedCommande = async (req, res) => {
  const id = req.params.id
  try {
    const Commandes = await sequelizeConfig.query(
      ` 
      SELECT
      c.idC,
      p.prod_name as produit,
      p.prix,
      t.nomT,
	  cou.nomC,
      u.login as Client,
      u.email,
      c.qty,
      c.idC,
      c.etat,
      b.idBoutique
      FROM commandes c
      JOIN produits p
      ON p.id = c.produitId
	  JOIN tailles t
	  ON t.id = c.tailleId
	  join couleurs cou
	  ON cou.id = c.couleurid
      JOIN boutiques b
      ON b.idBoutique = p.boutiqueIdBoutique
      JOIN users u
      ON u.userId = c.clientIdClient
      where b.idBoutique = ${id} and c.etat = 2  `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Commandes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getFactureForProduit = async (req, res) => {
  const id = req.params.idC
  try {
    const Commandes = await sequelizeConfig.query(
      ` 
      SELECT
      c.idC,
      c.qty,
      c.date,
      c.etat,
      p.prod_name as produit,
      p.prix,
      t.nomT as taille,
      p.remise,
      cou.nomC as couleur,
      cl.nom+' '+cl.prenom as client,
      u.email,
      cl.adresse,
      cl.tel
      FROM commandes c
      JOIN  produits p
      ON p.id = c.produitId
	  JOIN tailles t
	  ON t.id = c.tailleId
	  JOIN couleurs cou
	  ON cou.id = c.couleurid
      JOIN clients cl
      ON cl.idClient = c.clientIdClient
      JOIN users u
      ON u.userId = cl.idClient
      where c.idC =  ${id} and c.etat = 2`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Commandes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



