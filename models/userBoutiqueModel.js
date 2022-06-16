module.exports = (sequelize, DataTypes) => {
    const UserBoutique = sequelize.define("usersboutiques", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Prénom est un champ obligatoire !" }
            }
        },
        date_naissance: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Date de naissance vidéo est un champ obligatoire !" }
            }
        },
        sexe: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Sexe est un champ obligatoire !" }
            }
        },
        statut: {
            type: DataTypes.INTEGER,
        },

    })

    return UserBoutique
}