const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt');

// Model
const User = db.users;

//Add un user
const addUser = async (req, res) => {

    const nom = req.body.nom;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body?.password, 10);

    if (nom === '') {
        return res.status(404).json('Veuillez fournir un nom svp');
    } else if (email === "") {
        return res.status(404).json('Veuillez fournir un email svp');
    } else if (req.body.password === '') {
        return res.status(404).json('Veuillez fournir un password svp');
    } else {

        db.users.findOne({
            where: { email: req.body.email }
        }).then(user => {
            if (user) {
                return res.status(404).json(`L'adresse email existe déjà, veuillez entrer une autre`);
            } else {
                let dataUser = {};

                dataUser.nom = nom;
                dataUser.email = email;

                dataUser.password = password;
                dataUser.role = req.body.role;
                dataUser.statut = 0;

                User.create(dataUser).then(value => {
                    let message = `Utilisateur créé avec succès`;
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
        }).catch(err => {
            return res.status(404).json(`Remplir tous les champs svp`);
        })
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    const data = await User.findAll({
        include: [{
            model: db.usersboutiques,
            as: 'usersboutiques'
        },
        {
            model: db.partenaires,
            as: 'partenaires'
        },
        {
            model: db.comptes,
            as: 'comptes'
        }
        ],
    });

    res.status(200).json({ data })
}

const getAllUsersAndTransactions = async (req, res) => {
    const data = await User.findAll({
        include: [{
            model: db.transactions,
            as: 'transactions'
        }],
    })

    res.status(200).json({ data })
}


const getOneUser = async (req, res) => {

    let id = req.params.id;
    let user = await User.findOne({
        where: { id: id },
    })
    if (user === null) {
        res.status(404).json({ message: 'Aucun utilisateur n\'a été trouvé' });
    }
    res.status(200).json({ message: 'L\'utilisateur ' + id + ' a été trouvé avec succès', data: user });
}

// 4. Mis à jour du User

const updateUser = async (req, res) => {

    let id = req.params.id;
    const user = await User.update(req.body, { where: { id: id } })
    res.status(200).json({ message: 'L\'utilisateur ' + id + ' a été modifié avec succès', data: user });

}

// 5. Supprimer un user

const deleteUser = async (req, res) => {

    let id = req.params.id;
    let user = await User.destroy({ where: { id: id } });
    res.status(200).json({ message: 'L\'utilisateur ' + id + ' a été supprimé avec succès', data: user });

}

module.exports = {
    deleteUser,
    updateUser,
    getAllUsers,
    addUser,
    getOneUser,
    getAllUsersAndTransactions
}