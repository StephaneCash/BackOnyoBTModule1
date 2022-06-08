const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
//créer des modèles principaux

const Transaction = db.transactions;
const User = db.users;

// 1. Récupération de toutes les transactions

const getAllTransactions = async (req, res) => {

    const data = await Transaction.findAll({
        include: [{
            model: db.users,
            as: 'users'
        }],
    })

    res.status(200).json({ status: 200, data: data })
}

// 2. Création d'une transaction

const addTransaction = (req, res) => {

    Transaction.create(req.body).then(value => {
        let message = `Transaction créée avec succès`;
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

// 3. Récupération d'une transaction

const getOneTransaction = async (req, res) => {

    let id = req.params.id;
    let transaction = await Transaction.findOne({
        where: { id: id },
    })
    if (transaction === null) {
        res.status(404).json({ message: 'Aucune transaction n\'a été trouvée' });
    }
    res.status(200).json({ message: 'La transaction ' + id + ' a étét trouvée avec succès', data: transaction });
}

// 4. Mettre à jour la transaction

const updateTransaction = async (req, res) => {

    let id = req.params.id;
    const transaction = await Transaction.update(req.body, { where: { id_trans: id } })
    res.status(200).json({ message: 'La transaction ' + id + ' a étét modifiée avec succès', data: transaction });

}

// 5. Supprimer une transaction

const deleteTransaction = async (req, res) => {

    let id = req.params.id;
    let transaction = await Transaction.destroy({ where: { id_trans: id } });
    res.status(200).json({ message: 'La transaction ' + id + ' a étét supprimée avec succès', data: transaction });

}


module.exports = {
    getAllTransactions,
    addTransaction,
    updateTransaction,
    getOneTransaction,
    deleteTransaction
}

