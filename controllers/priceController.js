const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const Prix = db.prices;

//Add un user
const addPrix = async (req, res) => {

    const description = req.body.description;
    let nom = req.body.nom;

    let dataPrix = {}
    dataPrix.description = description;
    dataPrix.nom = nom;

    if (req.body.montant === '' || isNaN(req.body.montant)) {
        return res.status(400).json({ message: 'Veuillez remplir le champ montant' });
    } else {
        const montant = parseInt(req.body.montant);
        dataPrix.montant = montant;
        Prix.create(dataPrix).then(value => {
            let message = `Prix créé avec succès`;
            res.status(200).json({ message: message, data: value });
        }).catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({
                    message: err.message.split(",\n"),
                })
            }

            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({
                    message: err.message,
                })
            }
        })
    }

}

// Get all prix
const getAllPrix = async (req, res) => {
    const data = await Prix.findAll({
        include: [{
            model: db.videos,
            as: 'videos'
        }]
    });

    res.status(200).json({ data })
}

// 4. Mis à jour du prix
const updatePrix = async (req, res) => {

    let id = req.params.id;
    const user = await Prix.update(req.body, { where: { id: id } })
    
    res.status(200).json({ message: 'Le prix ' + id + ' a été modifié avec succès', data: user });

}
// 5. Supprimer un prix
const deletePrix = async (req, res) => {

    let id = req.params.id;
    let prix = await Prix.destroy({ where: { id: id } });
    res.status(200).json({ message: 'Le prix ' + id + ' a été supprimé avec succès', data: prix });

}

module.exports = {
    deletePrix,
    updatePrix,
    getAllPrix,
    addPrix,
}