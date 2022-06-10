const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const Categorie = db.categories;

//Add un user
const addCategorie = async (req, res) => {

    const nom = req.body.nom;
    const description = req.body.description;

    let dataCategory = {};

    dataCategory.nom = nom;
    dataCategory.description = description;


    Categorie.create(dataCategory).then(value => {
        let message = `Catégorie créée avec succès`;
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

// Get all category
const getAllCategory = async (req, res) => {
    const data = await Categorie.findAll();

    let message = `La liste de categories`;
    let status = 200;

    res.status(200).json(data);
}

// Get all category and transactions

const getCategoryAndTransactions = async (req, res) => {
    const data = await Categorie.findAll({
        include: [{
            model: db.transactions,
            as: 'transactions'
        }],
    })

    res.status(200).json({ data })
}

const getOneCategory = async (req, res) => {

    let id = req.params.id;
    let category = await Categorie.findOne({
        where: { id: id },
    })
    if (category === null) {
        res.status(404).json({ message: 'Aucune catégorie n\'a été trouvée' });
    }
    res.status(200).json({ message: 'La catégorie ' + id + ' a été trouvée avec succès', data: category });
}

// 4. Mis à jour de la catégorie

const updateCategory = async (req, res) => {

    let id = req.params.id;
    const category = await Categorie.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'La catégorie ' + id + ' a été modifié avec succès', data: category });

}

// 5. Supprimer une catégorie

const deleteCategory = async (req, res) => {

    let id = req.params.id;
    let category = await Categorie.destroy({ where: { id: id } });
    res.status(200).json({ message: 'La catégorie ' + id + ' a été supprimée avec succès', data: category });

}

module.exports = {
    addCategorie,
    deleteCategory,
    updateCategory,
    getOneCategory,
    getAllCategory,
    getCategoryAndTransactions
}