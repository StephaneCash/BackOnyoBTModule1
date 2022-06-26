module.exports = (sequelize, DataTypes) => {
    const Prix = sequelize.define("prices", {
        nom: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "La description est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Le description est un champ obligatoire !" }
            }
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Le montant est un champ obligatoire !" }
            }
        },
        nom: {
            type: DataTypes.STRING
        }
    })

    return Prix
}