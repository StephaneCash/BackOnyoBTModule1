const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const Partenaire = db.partenaires;

//Add un partenaire
const addPartenaire = async (req, res) => {

    const nom = req.body.nom;
    const description = req.body.description;

    let dataPartenaire = {};

    dataPartenaire.nom = nom;
    dataPartenaire.description = description;
    dataPartenaire.numTel = req.body.numTel;
    dataPartenaire.adresse = req.body.adresse;;
    dataPartenaire.statut = 0;
    dataPartenaire.categoryId = req.body.categoryId;

    let user = await db.users.findAll({
        limit: 1,
        order: [['id', 'DESC']]
    })

    let id = user[0].id

    if (user[0].role === 'Partenaire') {
        dataPartenaire.userId = id;
        Partenaire.create(dataPartenaire).then(value => {
            let message = `Partenaire créé avec succès`;
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
            message: 'Erreur ! Le rôle doit être partenaire'
        })
    }
}

// Get all partenaires
const getAllPartenaires = async (req, res) => {
    const data = await Partenaire.findAll();

    let message = `La liste de partenaires`;

    res.status(200).json(data);
}

// Get all category and transactions

const getPartenairesAndCategories = async (req, res) => {
    const data = await Partenaire.findAll({
        include: [{
            model: db.categories,
            as: 'categories'
        }],
    })

    res.status(200).json({ data })
}

// Get all partenaires et leurs comptes

const getAllParteniresAndComptes = async (req, res) => {
    const data = await Partenaire.findAll({
        include: [{
            model: db.comptes,
            as: 'comptes'
        }, {
            model: db.users,
            as: 'users'
        }
        ],
    })

    res.status(200).json({ data })
}

const getOnePartenaire = async (req, res) => {

    let id = req.params.id;
    let partenaire = await Partenaire.findOne({
        where: { id: id },
    })
    if (partenaire === null) {
        res.status(404).json({ message: 'Aucune catégorie n\'a été trouvée' });
    }
    res.status(200).json({ message: 'La catégorie ' + id + ' a été trouvée avec succès', data: partenaire });
}

// 4. Mis à jour du partenaire

const updatePartenaire = async (req, res) => {

    let id = req.params.id;
    const partenaire = await Partenaire.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'Le parténaire ' + id + ' a été modifié avec succès', data: partenaire });

}

// 5. Supprimer un partenaire

const deletePartenaire = async (req, res) => {

    let id = req.params.id;
    let partenaire = await Partenaire.destroy({ where: { id: id } });
    res.status(200).json({ message: 'Le partenaire ' + id + ' a été supprimé avec succès', data: partenaire });

}

module.exports = {
    deletePartenaire,
    updatePartenaire,
    getAllPartenaires,
    addPartenaire,
    getPartenairesAndCategories,
    getOnePartenaire,
    getAllParteniresAndComptes
}