module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define("videos", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Cotent_code' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom est un champ obligatoire !" }
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Content vidéo est un champ obligatoire !" }
            }
        },
        statut: {
            type: DataTypes.INTEGER,
        },

    })

    return Video
}