const db = require('../models');

// Model
const CodesCopies = db.codescopies;

// Get all users
const getAllCodes = async (req, res) => {
    const data = await CodesCopies.findAll();

    res.status(200).json({ data })
}

// Get One Code
const getOneCode = async (req, res) => {

    let id = req.params.id;
    let code = await CodesCopies.findOne({
        where: { id: id },
    })
    if (code === null) {
        res.status(404).json({ message: 'Aucun code n\'a été trouvé' });
    }
    res.status(200).json({ message: 'Le code ' + id + ' a été trouvé avec succès', data: code });
}

// 5. Supprimer un code après qu'il ait été utilisé

const deleteCode = async (req, res) => {

    const data = await CodesCopies.findAll();

    let taille = data.length;
    setInterval(() => {
        res.status(200).json(data[taille - 1]);
    }, 10);
}

module.exports = {
    getAllCodes,
    getOneCode,
    deleteCode,
}