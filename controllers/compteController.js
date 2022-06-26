const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

//créer des modèles principaux

const Compte = db.comptes;

// 1. Récupération de tous les comptes

const getAllComptes = async (req, res) => {

    const data = await Compte.findAll();
    res.status(200).json({ status: 200, data: data })
}

const getAllComptesAndPartenaires = async (req, res) => {
    const data = await Compte.findAll({
        include: [{
            model: db.partenaires,
            as: 'partenaires'
        }],
    })

    res.status(200).json({ status: 200, data: data })
}

// 2. Création d'un compte

const addCompte = async (req, res) => {

    let dataCompte = {}

    let nom = req.body.nom;
    let montant = parseInt(req.body.montant) ? req.body.montant : 0;

    let views = await db.views.findAll();

    dataCompte.nom = nom;
    dataCompte.devise = 'OBT';
    dataCompte.statut = 0;
    dataCompte.montant = montant || views.length;
    dataCompte.partenaireId = req.body.partenaireId;

    Compte.create(dataCompte).then(value => {
        let message = `Compte créée avec succès`;
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

// 3. Récupération d'un compte

const getOneCompte = async (req, res) => {

    let id = req.params.id;
    let compte = await Compte.findOne({
        where: { id: id },
    })
    if (compte === null) {
        res.status(404).json({ message: 'Aucun compte n\'a été trouvé' });
    }
    res.status(200).json({ message: 'Le compte ' + id + ' a étét trouvé avec succès', data: compte });
}

// 4. Mettre à jour du compte

const updateCompte = async (req, res) => {

    let id = req.params.id;
    const compte = await Compte.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'Le compte ' + id + ' a étét modifié avec succès', data: compte });

}

// 5. Supprimer un compte

const deleteCompte = async (req, res) => {

    let id = req.params.id;
    let compte = await Compte.destroy({ where: { id: id } });
    res.status(200).json({ message: 'Le compte ' + id + ' a étét supprimé avec succès', data: compte });

}


module.exports = {
    deleteCompte,
    updateCompte,
    getOneCompte,
    getAllComptes,
    addCompte,
    getAllComptesAndPartenaires
}

