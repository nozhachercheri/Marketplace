
const { Produit, Boutique, User, sequelizeConfig, Sequelize, Stock, Couleur, Taille, Marque } = require("../db/index.js");





// exports.AddProduit = async (req, res) => {
//   const { idBoutique, categorieId, nom, prix, remise, size, desc, qty } = req.body

//   try {
//     const newProduit = await Produit.create({
//       nom: nom,
//       prix: prix,
//       size: size,
//       desc: desc,
//       remise: remise,
//       image: req.file.filename,
//       boutiqueIdBoutique: idBoutique,
//       categorieIdC: categorieId,
//     });
//     const newStock = await Stock.create({
//       produitId: newProduit.id,
//       qty: qty
//     });

//     res.status(201).json({
//       status: "Produit created successfully"
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error while creating prduit",
//       message: error.message,
//     });
//   }
// };

// exports.getAllBoutiqueProduits = async (req, res) => {
//   const id = req.params.id
//   try {
//     const Produits = await sequelizeConfig.query(
//       ` SELECT
//       p.id,
//       p.nom,
//       p.size,
//       p.prix,
//       p.remise,
//       p.[desc],
//       p.image,
//       u.login,
//       u.email,
//       c.nom as categorie,
//       s.qty
//        FROM
//        produits p
//      JOIN boutiques b
//      ON b.idBoutique = p.boutiqueIdBoutique
//      JOIN users u 
//      ON u.userId = b.idBoutique
//      JOIN categories c
//      ON c.idC = p.categorieIdC
//      JOIN stocks s
//      ON s.produitId = p.id 
//      where b.idBoutique = ${id} `,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Produits);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// exports.getProduit = async (req, res) => {
//   const id = req.params.id
//   try {
//     const Produit = await sequelizeConfig.query(
//       `   SELECT
//       p.id,
//       p.nom,
//       p.size,
//       p.remise,
//       p.prix,
//       p.[desc],
//       p.image,
//       u.login,
//       u.email,
//       c.nom as categorie,
//       s.qty
//        FROM
//        produits p
//      JOIN boutiques b
//      ON b.idBoutique = p.boutiqueIdBoutique
//      JOIN users u 
//      ON u.userId = b.idBoutique
//      JOIN categories c
//      ON c.idC = p.categorieIdC
//      JOIN stocks s
//      ON s.produitId = p.id 
//      where p.id = ${id}`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Produit);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// exports.deleteProduit = async (req, res) => {
//   try {
//     const produitId = req.params.id;
//     const Produits = await sequelizeConfig.query(
//       ` delete from stocks where produitId = ${produitId} 
//       delete from avis where produitId = ${produitId}
//       delete from commandes where produitId = ${produitId}  
//       delete from produits where id = ${produitId}  
//       `,
//       { type: Sequelize.QueryTypes.DELETE }
//     );
//     return res.status(200).send(Produits);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// exports.updateProduit = async (req, res) => {
//   const id = req.params.id;
//   const { nom, prix, size, desc, categorie } = req.body;
//   try {
//     console.log(nom, prix, size, desc, categorie)
//     const foundProduit = await Produit.findOne({
//       where: {
//         id: id,
//       },
//     });

//     if (!foundProduit) {
//       return res.status(404).json({
//         message: "produit not found",
//       });
//     }
//     else {
//       const updateProduit = await Produit.update(
//         {
//           nom: nom,
//           prix: prix,
//           size: size,
//           desc: desc,
//           categorie: categorie,
//         },
//         {
//           where: {
//             id: id,
//           },
//         }
//       );
//       return res.status(200).json({
//         message: "produit updated !",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// exports.getAllProduits = async (req, res) => {
//   try {
//     const Produits = await sequelizeConfig.query(
//       `  SELECT
//       p.id,
//       p.nom,
//       p.size,
//       p.prix,
//       p.remise,
//       p.[desc],
//       p.image,
//       u.login,
//       u.email,
//       c.nom as categorie,
//       s.qty
//        FROM
//        produits p
//      JOIN boutiques b
//      ON b.idBoutique = p.boutiqueIdBoutique
//      JOIN users u 
//      ON u.userId = b.idBoutique
//      JOIN categories c
//      ON c.idC = p.categorieIdC
//      JOIN stocks s
//      ON s.produitId = p.id `,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Produits);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// exports.getProduitWithCategorie = async (req, res) => {
//   const categorie = req.query.categorie;
//   try {
//     console.log(categorie)
//     const Produits = await sequelizeConfig.query(
//       ` SELECT 
//       * 
//       from produits
//       where categorie Like '%${categorie}%' `,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Produits);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// exports.getAvisOfProduit = async (req, res) => {
//   const produitId = req.params.produitId;
//   try {
//     const Avis = await sequelizeConfig.query(
//       ` SELECT
//       a.[desc],
//       c.nom+' '+c.prenom as nom
//       FROM avis a
//       JOIN produits p
//       ON p.id = a.produitId
//       JOIN clients c
//       ON c.idClient = a.clientIdClient
//       JOIN users u
//       ON u.userId = c.idClient
//       where a.produitId = ${produitId} `,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Avis);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
exports.AddAvis = async (req, res) => {
  const desc = req.body.desc;
  const clientId = req.body.clientId;
  const produitId = req.body.produitId;
  try {
    const Avis = await sequelizeConfig.query(
      ` Insert into avis (desc,clientIdClient,produitId) 
      values('${desc}',${clientId},${produitId})`,
      { type: Sequelize.QueryTypes.INSERT }
    );
    return res.status(200).send(Avis);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// exports.AddCategorie = async (req, res) => {
//   const nom = req.body.nom;
//   try {
//     const Categories = await sequelizeConfig.query(
//       ` Insert into categories (nom) 
//       values('${nom}')`,
//       { type: Sequelize.QueryTypes.INSERT }
//     );
//     return res.status(200).send(Categories);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// exports.deleteCategories = async (req, res) => {
//   const categorieId = req.params.categorieId;
//   try {
//     const Categories = await sequelizeConfig.query(
//       ` delete from  categories where idC = ${categorieId}`,
//       { type: Sequelize.QueryTypes.DELETE }
//     );
//     return res.status(200).send(Categories);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// exports.getAllCategories = async (req, res) => {
//   try {
//     const Categories = await sequelizeConfig.query(
//       ` select * FROM categories `,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Categories);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// exports.getProduitWithArticleIds = async (req, res) => {
//   console.log(req.query)
//   const article_ids = req.body.similarItems
//   const article_ids_str = article_ids.join(',');
//   try {
//     console.log(article_ids)
//     const Produits = await sequelizeConfig.query(
//       ` SELECT
//       p.id,
//       p.article_id,
//       p.size,
//       p.remise,
//       p.prix,
//       p.prod_name,
// 	    p.product_group_name,
//       u.login,
//       u.email,
//       imagePath
//       FROM
//       produits p
//       JOIN boutiques b
//       ON b.idBoutique = p.boutiqueIdBoutique
//       JOIN users u 
//       ON u.userId = b.idBoutique
//     wHERE
//     p.article_id IN (${article_ids_str})`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );
//     return res.status(200).send(Produits);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.AddProduit = async (req, res) => {
  const {
    prod_name
    // , product_type_no
    , product_group_name
    // , colour_group_code
    // , department_no
    // , index_name
    // , garment_group_no
    , prix
    , couleurs
    , sizes
    , remise
    , boutiqueIdBoutique
    , qty
    , marque } = req.body
  const article_id = ''
  const product_type_no = ''
  const colour_group_code = ''
  const department_no = ''
  const index_name = ''
  const garment_group_no = ''
  try {
    const newProduit = await Produit.create({
      article_id: article_id
      , prod_name: prod_name
      , product_type_no: product_type_no
      , product_group_name: product_group_name
      , colour_group_code: colour_group_code
      , department_no: department_no
      , index_name: index_name
      , garment_group_no: garment_group_no
      , prix: prix
      , remise: remise
      , image: req.file.filename
      , boutiqueIdBoutique: boutiqueIdBoutique
    });
    const newStock = await Stock.create({
      produitId: newProduit.id,
      qty: qty
    });
    const newMarque = await Marque.create({
      produitId: newProduit.id,
      nomM: marque
    });

    const parsedCouleurs = JSON.parse(couleurs);


    const newCouleurs = parsedCouleurs.map(async (couleur) => {
      await Couleur.create({
        produitId: newProduit.id,
        nomC: couleur,
      });
    });
    await Promise.all(newCouleurs);

    const parsedSizes = JSON.parse(sizes);

    // Map over the sizes array and create a new size entry for each size
    const newSizes = parsedSizes.map(async (size) => {
      await Taille.create({
        produitId: newProduit.id,
        nomT: size,
      });
    });
    await Promise.all(newSizes);
    // const newMarque = await Stock.create({
    //   produitId: newProduit.id,
    //   nomM: nomM
    // });

    res.status(201).json({
      status: "Produit created successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: "error while creating prduit",
      message: error.message,
    });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const Categories = await sequelizeConfig.query(
      ` select distinct [product_group_name] FROM produits where [product_group_name] ! = 'Unknown' `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProduitWithCategorie = async (req, res) => {
  const categorie = req.query.categorie

  try {
    console.log(categorie)
    const Produits = await sequelizeConfig.query(
      ` SELECT
      p.id,
      p.article_id,
      p.remise,
      p.prix,
      p.prod_name,
	    p.product_group_name,
      u.login,
      u.email,
      imagePath
      FROM
      produits p
      JOIN boutiques b
      ON b.idBoutique = p.boutiqueIdBoutique
      JOIN users u 
      ON u.userId = b.idBoutique
    where p.product_group_name like '%${categorie}%'`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Produits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getProduitWithArticleId = async (req, res) => {
  const article_id = req.query.article_id

  try {
    const Produit = await sequelizeConfig.query(
      `  SELECT
      p.id,
      p.article_id,
      p.remise,
      p.prix,
      p.prod_name,
	    p.product_group_name,
      u.login,
      u.email,
      imagePath
      FROM
      produits p
	  JOIN tailles t
	  ON t.produitId = p.id
	  JOIN couleurs cou
	  ON cou.produitId = p.id
      JOIN boutiques b
      ON b.idBoutique = p.boutiqueIdBoutique
      JOIN users u 
      ON u.userId = b.idBoutique
    where p.article_id = ${article_id}`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Produit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProduitWithArticleIds = async (req, res) => {
  const similarItems = req.query.similarItems;
console.log(similarItems)
  if (!Array.isArray(similarItems)) {
    return res.status(400).json({ message: "Invalid article_ids parameter" });
  }
  const similarItems_str = similarItems.join(",");
  try {
    const Produits = await sequelizeConfig.query(
      `SELECT
        p.id,
        p.article_id,
        p.remise,
        p.prix,
        p.prod_name,
        p.product_group_name,
        u.login,
        u.email,
        imagePath
      FROM
        produits p
        JOIN boutiques b ON b.idBoutique = p.boutiqueIdBoutique  
        JOIN users u ON u.userId = b.idBoutique
      WHERE
        p.article_id IN (${similarItems_str})`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Produits);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.getAllBoutiqueProduit = async (req, res) => {
  const boutiqueId = req.params.id

  try {
    const Produits = await sequelizeConfig.query(
      `  SELECT
      p.id,
      p.article_id,
      p.prod_name,
      p.product_group_name,
      p.product_type_no,
      p.prix,
      p.remise,
      m.nomM,
      s.qty,
      p.imagePath,
      m.nomM as marque,
      p.boutiqueIdBoutique
      FROM produits p
      inner JOIN stocks s
      ON s.produitId = p.id
      inner JOIN marques m
      ON m.produitId = p.id
      where boutiqueIdBoutique = ${boutiqueId}`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Produits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getAvisOfProduit = async (req, res) => {
  const produitId = req.params.produitId

  try {
    const avis = await sequelizeConfig.query(
      `   SELECT
      a.[desc],
      a.produitId,
      c.nom+' '+c.prenom as client
      FROM avis a
      JOIN  produits p
      ON p.id = a.produitId
      JOIN clients c
      ON c.idClient = a.clientIdClient
      where a.produitId  = ${produitId}`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(avis);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getTaillesOfProduit = async (req, res) => {
  const produitId = req.params.produitId
 
  try {
    console.log("taille",produitId)
    const tailles = await sequelizeConfig.query(
      `   	  SELECT
      t.id,
      t.nomT
      FROM produits p 
      JOIN tailles t
      ON t.produitId = p.id
      where p.id = ${produitId}`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(tailles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
exports.getCouleursOfProduit = async (req, res) => {
  const produitId = req.params.produitId

  try {
    console.log("couleur",produitId)
    const couleurs = await sequelizeConfig.query(
      `   	  SELECT
      c.id,
      c.nomC
      FROM produits p 
      JOIN couleurs c
      ON c.produitId = p.id
      where p.id = ${produitId}`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(couleurs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
exports.deleteProduit = async (req, res) => {
  const produitId = req.params.produitId
  try {
    const produits = await sequelizeConfig.query(
      
      `delete from commandes where produitId  = ${produitId}
      delete from couleurs where produitId = ${produitId}
      delete from tailles where produitId = ${produitId}
      delete from stocks where produitId = ${produitId}   	  
      delete from produits where id = ${produitId}`,
      { type: Sequelize.QueryTypes.DELETE }
    );
    return res.status(200).send(produits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}