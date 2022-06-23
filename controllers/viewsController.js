const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const View = db.views;

//Add une view
const addView = async (req, res) => {

    let dataView = {}

    View.create(dataView).then(value => {
        let message = `View créée avec succès`;
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

// Get all views
const getAllViews = async (req, res) => {
    View.findAll().then(({ count, rows }) => {
        let message = `La liste `;
        let status = 200;
        res.status(200).json({
            status: status,
            message: message,
            data: rows,
            taille: count
        });
    })
}

const getOneView = async (req, res) => {

    let id = req.params.id;
    let view = await View.findOne({
        where: { id: id },
    })
    if (view === null) {
        res.status(404).json({ message: 'Aucune view n\'a été trouvée' });
    }
    res.status(200).json({ message: 'La view ' + id + ' a été trouvée avec succès', data: view });
}

module.exports = {
    getAllViews,
    addView,
    getOneView
}