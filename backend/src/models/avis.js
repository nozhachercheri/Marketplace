module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "avis",
    {

      desc:Sequelize.STRING,
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
