const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

const Conference = db.conferences;

//Programmation de la conférence
const addConference = async (req, res) => {

    const ref_user = req.body.ref_user;
    const channel_id = req.body.channel_id;
    const conference_id = req.body.conference_id;
    const date_conference = req.body.date_conference;

    let dataConference = {};

    dataConference.ref_user = ref_user;
    dataConference.channel_id = channel_id;
    dataConference.conference_id = conference_id;
    dataConference.video_live_url = null;
    dataConference.date_conference = date_conference;
    dataConference.statut = 0;


    Conference.create(dataConference).then(value => {
        let message = `Conférence créée avec succès`;
        res.status(200).json({ message: message, success: true, data: value });
    }).catch(err => {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err.message.split(",\n"),
                success: false
            })
        }

        if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err.message,
                success: false
            })
        }
    })
}

// Get all conference
const getAllConference = async (req, res) => {
    const data = await Conference.findAll();

    let status = 200;

    res.status(status).json(data);
}

//Get conference by conference_id
const getOneConference = async (req, res) => {

    let id = req.params.id;
    let conference = await Conference.findOne({
        where:{conference_id: id },
    })
    if (conference === null) {
        res.status(404).json({message: 'Aucune conférence n\'a été trouvée', success: false});
    }
    res.status(200).json({success: true, message:'La catégorie ' + id + ' a été trouvée avec succès', data: conference});
}

// 4. Mise à jour de la video conference
const updateVideoConference = async (req, res) => {

    let id = req.params.id;
    const conference = await Conference.update(req.body, { where: {conference_id: id } })
    res.status(200).json({success: true, message: 'La video conférence ' + id + ' a été mise à jour avec succès', data: conference});

}

// 5. Supprimer une conférence programmée
const deleteConference = async (req, res) => {

    let id = req.params.id;
    let conference = await Conference.destroy({ where: { conference_id: id } });
    res.status(200).json({ message: 'La conférence ' + id + ' a été supprimée avec succès', success: true, data: conference});

}

module.exports = {
    addConference,
    deleteConference,
    updateVideoConference,
    getOneConference,
    getAllConference
}