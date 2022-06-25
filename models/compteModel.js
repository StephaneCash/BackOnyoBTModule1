module.exports = (sequelize, DataTypes) => {
    const Compte = sequelize.define("comptes", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        devise: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Devise est un champ obligatoire !" }
            }
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Montant est un champ obligatoire !" }
            }
        },
        statut: {
            type: DataTypes.INTEGER,
        }
    })

    return Compte
}