const jwt = require('jsonwebtoken')
const primaryKey = require('./private_key')

module.exports = (req, res, next) => {
    const autorization = req.headers.autorization;

    if (!autorization) {
        const msg = `Vous n'avez pas fourni le jéton d'authentification. Ajoutez-en un dans l'en-tête  dela requête`;
        return res.status(401).json({ msg });
    }
}