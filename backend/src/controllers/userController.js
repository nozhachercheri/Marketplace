const bcrypt = require("bcryptjs");
const {
  User,
  Admin,
  Client,
  Boutique,
  sequelizeConfig,
  Sequelize
} = require("../db/index.js");


//#region SIGNUP
exports.signUpClient = async (req, res) => {
  const { login, email, motDePasse,nom,prenom, adresse,tel } = req.body
 
  try {
    console.log(login, email, motDePasse,nom,prenom, adresse,tel)
    const newuser = await User.create({
      login: login,
      email: email,
      motDePasse: bcrypt.hashSync(motDePasse, 8)
    });
    const newClient = await Client.create({
      idClient: newuser.userId,
      nom: nom,
      prenom: prenom,
      adresse : adresse,
      tel:tel
    });

    res.status(201).json({
      status: "Client created successfully",
      client: newClient,
    });
  } catch (error) {
    res.status(400).json({
      status: "signup failed",
      message: error.message,
    });
  }
};
exports.signUpBoutique = async (req, res) => {
  const { login, email, motDePasse, closeTime, openTime, description } = req.body;
  try {
    const newuser = await User.create({
      login: login,
      email: email,
      motDePasse: bcrypt.hashSync(motDePasse, 8)
    });
    const newBoutique = await Boutique.create({
      idBoutique: newuser.userId,
      closeTime: closeTime,
      openTime: openTime,
      cover: req.file.filename,
      description: description
    });
    res.status(201).json({
      status: "Boutique created successfully",
      boutique: newBoutique,
    });
  } catch (error) {
    res.status(400).json({
      status: "signup failed",
      message: error.message,
    });
  }
};
exports.signUpAdmin = async (req, res) => {
  const { login, email, motDePasse } = req.body;

  try {
    const newuser = await User.create({
      login: login,
      email: email,
      motDePasse: bcrypt.hashSync(motDePasse, 8)
    });
    const newAdmin = await Admin.create({
      idAdmin: newuser.userId
    });
    res.status(201).json({
      status: "admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    res.status(400).json({
      status: "signup failed",
      message: error.message,
    });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteBoutique = async (req, res) => {
  const id = req.params.id;
  try {
    const founduser = await User.findOne({
      where: {
        userId: id
      }
    });
    if (founduser) {
      await User.destroy({
        where: {
          userId: id,
        },
      });
      await Boutique.destroy({
        where: {
          idBoutique: id,
        },
      })
      return res.status(200).json({
        message: "user deleted !"

      });
    } else {
      return res.status(404).json({
        message: "user not found !"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.signin = async (req, res) => {
  const { email, motDePasse } = req.body;
console.log(email, motDePasse)
  const findUser = await User.findOne({
    where: { email: email },
  });
  if (!findUser) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const passwordIsValid = bcrypt.compareSync(motDePasse, findUser.motDePasse);

  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Auth failed ! Invalid Password!",
    });
  }
  const isAdmin = await Admin.findOne({
    where: { idAdmin: findUser.userId },
  });

  if (isAdmin) {
    const foundAdmin = {
      id: findUser.userId,
      email: findUser.email,
      login: findUser.login,
      role: "admin"
    };
    return res.status(200).json({
      message: "logged in succefully",
      user: foundAdmin,
    });
  }

  const isClient = await Client.findOne({
    where: { idClient: findUser.userId },
  });

  if (isClient) {
    const foundClient = {
      id: findUser.userId,
      login: findUser.login,
      email: findUser.email,
      role: "Client"
    };
    return res.status(200).json({
      message: "logged in succefully",
      user: foundClient,
    });
  }

  const isBoutique = await Boutique.findOne({
    where: { idBoutique: findUser.userId },
  });

  if (isBoutique) {
    const foundBoutique = {
      id: findUser.userId,
      login: findUser.login,
      email: findUser.email,
      email: findUser.email,
      role: "Boutique"
    };
    return res.status(200).json({
      message: "logged in succefully",
      user: foundBoutique,
    });
  }



};


exports.getAllBoutiques = async (req, res) => {
  try {
    const Boutiques = await sequelizeConfig.query(
      `  select  * 
      from users u
      JOIN boutiques b
      ON b.idBoutique = u.userId `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Boutiques);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getBoutiqueInfos = async (req, res) => {
  const id = req.params.id;
  try {
    const Boutique = await sequelizeConfig.query(
      `select 
      u.userId,
      b.description,
      b.openTime,
      b.closeTime
      from users u
      JOIN  boutiques b
      ON u.userId = b.idBoutique
      where u.userId =${id}  `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Boutique);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.UpdatBoutiqueInfos = async (req, res) => {
  const {id, description, openTime, closeTime } = req.body;
  try {
    const Boutique = await sequelizeConfig.query(
      ` UPDATE boutiques set description = '${description}' , openTime = '${openTime}', closeTime = '${closeTime}'  where idBoutique = ${id}  `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Boutique);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updatePwdBoutique = async (req, res) => {
  const { oldmotDePasse, newmotDePasse, id } = req.body;
  try {
    console.log(oldmotDePasse, newmotDePasse, id)
    const foundUser = await User.findOne({
      where: {
        userId: id,
      },
    });

    if (!foundUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const passwordIsValid = bcrypt.compareSync(
      oldmotDePasse,
      foundUser.motDePasse
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Auth failed ! Invalid Password!",
      });
    }
    const newBoutique = await Boutique.findOne({
      where: {
        idBoutique: id,
      },
    });
    if (newBoutique) {
      const upadtedpwd = await User.update(
        { motDePasse: bcrypt.hashSync(newmotDePasse, 8) },
        {
          where: {
            userId: id,
          },
        }
      );
      return res.status(200).json({
        message: "pwd updated !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePwdClient = async (req, res) => {
  const { oldmotDePasse, newmotDePasse, clientId } = req.body;
  try {
    const foundUser = await User.findOne({
      where: {
        userId: clientId,
      },
    });

    if (!foundUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const passwordIsValid = bcrypt.compareSync(
      oldmotDePasse,
      foundUser.motDePasse
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Auth failed ! Invalid Password!",
      });
    }
    const newClient = await Client.findOne({
      where: {
        idClient: clientId,
      },
    });
    if (newClient) {
      const upadtedpwd = await User.update(
        { motDePasse: bcrypt.hashSync(newmotDePasse, 8) },
        {
          where: {
            userId: clientId,
          },
        }
      );
      return res.status(200).json({
        message: "pwd updated !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
exports.getClientInfos = async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const Client = await sequelizeConfig.query(
      `  SELECT
      *
      FROM users u
      JOIN clients c
      ON c.idClient = u.userId
      where c.idClient  =${clientId}  `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.status(200).send(Client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}