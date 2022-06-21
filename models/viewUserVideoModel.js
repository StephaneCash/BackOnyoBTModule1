module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define("views", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ nom est vide" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "La description est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "La description est un champ obligatoire !" }
            }
        },
    })

    return Categorie
}