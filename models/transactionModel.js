module.exports = (sequelize, DataTypes) => {
    return sequelize.define("transactions", {
        content_code: {
            type: DataTypes.STRING,
        },
        reception: {
            type: DataTypes.INTEGER,
        },

        numTel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Numéro de téléphone est un champ obligatoire !" }
            }
        },
        annulation: {
            type: DataTypes.INTEGER,
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Montant est un champ obligatoire !" }
            }
        },
        exp_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom expéditeur est un champ obligatoire !" }
            }
        },
        statut: {
            type: DataTypes.INTEGER,
        },
        devise: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "La devise  est un champ obligatoire !" }
            }
        },
    })

}