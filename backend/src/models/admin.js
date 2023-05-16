module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "admin",
    {
      idAdmin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
