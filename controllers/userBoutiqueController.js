const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');

//créer des modèles principaux

const UserBoutique = db.usersboutiques;

// 1. Récupération de tous les users

const getAllUsersBoutiques = async (req, res) => {

    const data = await UserBoutique.findAll();
    res.status(200).json({ status: 200, data: data })
}

const getAllUsersBoutiquesAndUsers = async (req, res) => {
    const data = await UserBoutique.findAll({
        include: [{
            model: db.users,
            as: 'users'
        }],
    })

    res.status(200).json({ status: 200, data: data })
}

const getAllUsersBoutiquesAndVideos = async (req, res) => {
    const data = await UserBoutique.findAll({
        include: [{
            model: db.videos,
            as: 'videos'
        }],
    })

    res.status(200).json({ status: 200, data: data })
}

// 2. Création d'un userBoutique

const addUserBoutique = async (req, res) => {

    let dataUserBoutique = {};

    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let date_naissance = req.body.date_naissance;
    let sexe = req.body.sexe;

    dataUserBoutique.nom = nom;
    dataUserBoutique.prenom = prenom;
    dataUserBoutique.date_naissance = date_naissance;
    dataUserBoutique.sexe = sexe;
    dataUserBoutique.statut = 0;

    let user = await db.users.findAll({
        limit: 1,
        order: [['id', 'DESC']]
    })

    let id = user[0].id

    if (user[0].role === 'user-streaming') {
        dataUserBoutique.userId = id;
        UserBoutique.create(dataUserBoutique).then(value => {
            let message = `Utilisateur stream créé avec succès`;

            res.status(200).json({ message: message, data: value });
        }).catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({
                    message: err.message.split(",\n")
                })
            }

            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({
                    message: err.message
                })
            }
        })
    } else {
        return res.status(400).json({
            message: "Erreur !! Le rôle doit être user-streaming"
        })
    }
}

// 3. Récupération d'un UserBoutique

const getOneUserBoutique = async (req, res) => {

    let id = req.params.id;
    let userBoutique = await UserBoutique.findOne({
        where: { id: id },
    })
    if (transaction === null) {
        res.status(404).json({ message: 'Aucun userStreaming n\'a été trouvé' });
    }
    res.status(200).json({ message: 'Le user Streaming ' + id + ' a étét trouvé avec succès', data: userBoutique });
}

// 4. Mettre à jour du User Streaming

const updateUserBoutique = async (req, res) => {

    let id = req.params.id;
    const userStreaming = await UserBoutique.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'Le user Streaming ' + id + ' a étét modifié avec succès', data: userStreaming });

}

// 5. Supprimer un User Streaming

const deleteUserBoutique = async (req, res) => {

    let id = req.params.id;
    let userStreaming = await UserBoutique.destroy({ where: { id: id } });
    res.status(200).json({ message: 'Le userStreaming ' + id + ' a été supprimé avec succès', data: userStreaming });

}

module.exports = {
    deleteUserBoutique,
    updateUserBoutique,
    getOneUserBoutique,
    addUserBoutique,
    getAllUsersBoutiques,
    getAllUsersBoutiquesAndUsers,
    getAllUsersBoutiquesAndVideos
}

