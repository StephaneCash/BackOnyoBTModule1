const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize')

// Model
const User = db.users;

//Add un user
const addUser = async (req, res) => {

    User.create(req.body).then(value => {
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

// Get all users
const getAllUsers = async (req, res) => {
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

// 4. Mettre à jour du User

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
}