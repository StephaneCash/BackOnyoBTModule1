const db = require('../models');

// Model
const CodesCopies = db.codescopies;

// Get all users
const getAllCodes = async (req, res) => {
    const data = await CodesCopies.findAll();

    if (!data) {
        res.status(200).json({ message: "Pas de données disponibles" })
    } else {
        res.status(200).json({ data })
    }
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
    let id = req.params.id;
    const data = await CodesCopies.destroy({ where: { id: id } });

    res.status(200).json({ message: "Code supprimé avec succès", data });
}

module.exports = {
    getAllCodes,
    getOneCode,
    deleteCode,
}