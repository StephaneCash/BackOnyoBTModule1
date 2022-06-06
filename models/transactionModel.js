module.exports = (sequelize, DataTypes) => {
    return sequelize.define("transactions", {
        content_code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Code est un champ obligatoire !" }
            }
        },
        reception: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'reception' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Ceci est un champ obligatoire !" }
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
        annulation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Ceci est un champ obligatoire !" }
            }
        },
        suppression: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Ceci est un champ obligatoire !" }
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
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Ceci est un champ obligatoire !" }
            }
        },
    })

}