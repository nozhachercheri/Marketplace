module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "produit",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      article_id: Sequelize.STRING,
      prod_name: Sequelize.STRING,
      product_type_no: Sequelize.STRING,
      product_group_name: Sequelize.STRING,
      colour_group_code: Sequelize.STRING,
      department_no: Sequelize.STRING,
      index_name: Sequelize.STRING,
      garment_group_no: Sequelize.STRING,
      prix: Sequelize.STRING,
      remise: Sequelize.STRING,
      boutiqueIdBoutique: Sequelize.STRING,
      imagePath: Sequelize.STRING,
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
