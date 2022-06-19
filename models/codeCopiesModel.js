module.exports = (sequelize, DataTypes) => {
    const CodesCopies = sequelize.define("codescopies", {
        content: {
            type: DataTypes.STRING,
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Le montant est un champ obligatoire !" }
            }
        },
        statut: {
            type: DataTypes.INTEGER,
        },
    })

    return CodesCopies
}