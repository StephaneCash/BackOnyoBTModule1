const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const Generate = db.generates;

//Add un user
const addGenerate = async (req, res) => {

    const montant = req.body.montant;

    if (montant === '') {
        return res.status(404).json('Veuillez fournir un montant svp');
    } else {

        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let codeLength = 16;
        let password = "";

        for (let i = 0; i <= codeLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        let tab = password.split('');
        tab[4] = '-';
        tab[9] = '-';
        tab[14] = '-';

        let codeGenere = tab.join().replace(/[,]/g, '');

        let dateGenerate = {};
        dateGenerate.montant = montant;
        dateGenerate.statut = 0;

        if (montant) {
            dateGenerate.content = montant + '.' + codeGenere;
        }

        Generate.create(dateGenerate).then(value => {
            let message = `Code créé avec succès`;
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
}

// Get all users
const getAllCodes = async (req, res) => {
    const data = await Generate.findAll();

    res.status(200).json({ data })
}

// Get One Code
const getOneCode = async (req, res) => {

    let id = req.params.id;
    let code = await Generate.findOne({
        where: { id: id },
    })
    if (code === null) {
        res.status(404).json({ message: 'Aucun code n\'a été trouvé' });
    }
    res.status(200).json({ message: 'Le code ' + id + ' a été trouvé avec succès', data: code });
}

// 5. Supprimer un user

const deleteCode = async (req, res) => {

    let id = req.params.id;
    let code = await Generate.destroy({ where: { id: id } });

    if (!code) {
        res.status(404).json({ message: 'Le code à supprimer n\'existe pas' });
    } else {
        res.status(200).json({ message: 'Le code ' + id + ' a été supprimé avec succès', data: code });
    }

}

const viderCode = async (req, res) => {
    let code = await Generate.destroy({ where: {}, cascade: true });
    if (code) {
        res.status(200).json({ message: 'L\'espace a été libéré avec succès', });
    } else {
        res.status(404).json({ message: 'L\espace n\'a pas été libéré' });
    }
}

module.exports = {
    addGenerate,
    getAllCodes,
    getOneCode,
    deleteCode,
    viderCode
}