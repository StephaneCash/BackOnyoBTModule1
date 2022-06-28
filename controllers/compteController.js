const db = require('../models');
const { evaluate } = require('mathjs');
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

// 6 Calculs du montant

const calculs = async (req, res) => {
    let montantCompte = parseInt(req.body.montantCompte);
    let montantTransaction = parseInt(req.body.montant);
    let id = parseInt(req.params.id);

    if (montantCompte > montantTransaction) {

        let montantT = evaluate(montantCompte - montantTransaction)
        let compteUpdate = await Compte.update({ montant: montantT }, { where: { id: id } });

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
    
        dataTransaction.content_code = codeGenere;
        dataTransaction.reception = 0;
        dataTransaction.numTel = numTel;
        dataTransaction.annulation = 0;
        dataTransaction.devise = 'OBT';
        dataTransaction.exp_name = exp_name; 
        dataTransaction.statut = 0;
        dataTransaction.montant = montantTransaction; 
        dataTransaction.categoryId = req.body.categoryId;
        dataTransaction.userId = req.body.userId;
    
        db.transactions.create(dataTransaction).then(value => {
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

        if (compteUpdate) {
            res.status(200).json({
                message: 'Transaction effectuée avec succès ',
                data: compteUpdate
            });
        } else {
            res.status(200).json({
                message: 'La transaction n\'a pas abouti.'
            });
        }
    } else {
        res.status(200).json({
            message: `La transaction n'a pas abouti, car votre solde est insuffisant ${montantCompte} < ${montantTransaction}`,
        });
    }
}


module.exports = {
    deleteCompte,
    updateCompte,
    getOneCompte,
    getAllComptes,
    addCompte,
    getAllComptesAndPartenaires,
    calculs
}

