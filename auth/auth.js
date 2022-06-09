const jwt = require('jsonwebtoken')
const primaryKey = require('./private_key')


module.exports = (req, res, next) => {
    const autorization = req.headers.authorization;

    if (!autorization) {
        const msg = `Vous n'avez pas fourni le jéton d'authentification. Ajoutez-en un dans l'en-tête  de la requête ${autorization}`;
        return res.status(401).json({ msg });
    } else {
        const token = autorization.split(' ')[1];

        jwt.verify(token, primaryKey, (err, user) => {
            if (err) {
                return res.status(403).json("Votre jeton n'est pas valide " + err);
            } else {
                console.log('Auth successful : ', user)
                req.user = user;
                next();
            }
        })
    }
}