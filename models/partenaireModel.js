module.exports = (sequelize, DataTypes) => {
    const Partenaire = sequelize.define("partenaires", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Partenaire' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Description est un champ obligatoire !" }
            }
        },
        statut: {
            type: DataTypes.INTEGER,
        },
    })

    return Partenaire
}