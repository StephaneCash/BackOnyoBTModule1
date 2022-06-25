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
        numTel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Numéro de téléphone est un champ obligatoire !" }
            }
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Adresse est un champ obligatoire !" }
            }
        },
        photo: {
            type: DataTypes.STRING,
        },
        statut: {
            type: DataTypes.INTEGER,
        },
        validate: {
            type: DataTypes.INTEGER
        }

    })

    return Partenaire
}