module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define("categories", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Ce champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "La description est un champ obligatoire !" }
            }
        },
    })

    return Categorie
}