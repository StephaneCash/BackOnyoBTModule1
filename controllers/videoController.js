const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const Video = db.videos;

//Add une vidéo
const addVideo = async (req, res) => {

    const nom = req.body.nom;
    const content = req.body.content;
    const prix = req.body.prix;

    let dataVideo = {};

    dataVideo.nom = nom;
    dataVideo.content = content;
    dataVideo.statut = 0;
    dataVideo.prix = prix;

    Video.create(dataVideo).then(value => {
        let message = `Vidéo créée avec succès`;
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
}

// Get all vidéeos
const getAllVideos = async (req, res) => {
    const data = await Video.findAll();
    let message = `La liste de vidéos`;
    let status = 200;

    res.status(200).json({
        status: status,
        message: message,
        data: data
    });
}

// Get all vidéos and users Strealings

const getAllVideosAndUserBoutique = async (req, res) => {
    const data = await Video.findAll({
        include: [{
            model: db.usersboutiques,
            as: 'usersboutiques'
        }],
    })
    res.status(200).json({ data })
}

const getOneVideo = async (req, res) => {

    let id = req.params.id;
    let video = await Video.findOne({
        where: { id: id },
    })
    if (video === null) {
        res.status(404).json({ message: 'Aucune vidéo n\'a été trouvée' });
    }
    res.status(200).json({ message: 'La vidéo ' + id + ' a été trouvée avec succès', data: video });
}

// 4. Mis à jour d'une vidéo

const updateVideo = async (req, res) => {
    let id = req.params.id;
    const video = await Video.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'La vidéo ' + id + ' a été modifié avec succès', data: video });
}

// 5. Supprimer une vidéo

const deleteVideo = async (req, res) => {
    let id = req.params.id;
    let video = await Video.destroy({ where: { id: id } });
    res.status(200).json({ message: 'La vidéo ' + id + ' a été supprimée avec succès', data: video });
}

module.exports = {
    deleteVideo,
    updateVideo,
    getOneVideo,
    getAllVideosAndUserBoutique,
    getAllVideos,
    addVideo
}