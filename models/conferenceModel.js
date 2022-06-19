module.exports = (sequelize, DataTypes) => {
    const Conference = sequelize.define("conferences", {
        ref_user: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        channel_id: {
            type: DataTypes.STRING(155),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Channel ID est un champ obligatoire !" }
            } 
        },
        conference_id: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Votre champ est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Conférence ID est un champ obligatoire !" }
            }
        },
        video_live_url: {
            type: DataTypes.TEXT,
            allowNull: true
        }, 
        date_conference: {
            type: DataTypes.DATE,
            allowNull: true
        },
        statut: {
            type: DataTypes.INTEGER,
        }
    })

    return Conference
}