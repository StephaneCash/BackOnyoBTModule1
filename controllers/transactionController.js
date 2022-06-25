const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
const bcrypt = require('bcrypt');

//créer des modèles principaux

const Transaction = db.transactions;
const User = db.users;

// 1. Récupération de toutes les transactions

const getAllTransactions = async (req, res) => {

    const data = await Transaction.findAll();
    res.status(200).json({ status: 200, data: data })
}

const getAllTransactionsUsers = async (req, res) => {
    const data = await Transaction.findAll({
        include: [{
            model: db.users,
            as: 'users'
        }],
    })

    res.status(200).json({ status: 200, data: data })
}

// Get Transaction categories

const getAllTransactionsAndCategories = async (req, res) => {
    const data = await Transaction.findAll({
        include: [{
            model: db.categories,
            as: 'categories'
        }]
    })

    res.status(200).json({ data })
}

const getPartenairesTransactions = async (req, res) => {
    const data = await Transaction.findAll({
        include: [{
            model: db.partenaires,
            as: 'partenaires'
        }]
    })

    res.status(200).json({ data })
}

// 2. Création d'une transaction

const addTransaction = (req, res) => {

    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLengh = 16;
    let password = "";

    for (let i = 0; i <= passwordLengh; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    let tab = password.split('');
    tab[4] = '-';
    tab[9] = '-';
    tab[14] = '-';

    let codeGenere = tab.join().replace(/[,]/g, '');

    let dataTransaction = {};

    let numTel = req.body.numTel;
    let exp_name = req.body.exp_name;
    let montant = parseInt(req.body.montant);

    dataTransaction.content_code = codeGenere;
    dataTransaction.reception = 0;
    dataTransaction.numTel = numTel;
    dataTransaction.annulation = 0;
    dataTransaction.devise = req.body.devise;
    dataTransaction.exp_name = exp_name;
    dataTransaction.statut = 0;
    dataTransaction.montant = montant;
    dataTransaction.categoryId = req.body.categoryId;
    dataTransaction.userId = req.body.userId;

    Transaction.create(dataTransaction).then(value => {
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
    const transaction = await Transaction.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'La transaction ' + id + ' a étét modifiée avec succès', data: transaction });

}

// 5. Supprimer une transaction

const deleteTransaction = async (req, res) => {

    let id = req.params.id;
    let transaction = await Transaction.destroy({ where: { id: id } });
    res.status(200).json({ message: 'La transaction ' + id + ' a étét supprimée avec succès', data: transaction });

}


module.exports = {
    getAllTransactions,
    addTransaction,
    updateTransaction,
    getOneTransaction,
    deleteTransaction,
    getAllTransactionsAndCategories,
    getAllTransactionsUsers, 
    getPartenairesTransactions
}

