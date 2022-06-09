const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const primaryKey = require('../auth/private_key');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        if (req.body.email === "") {
            const message = "Veuillez renseigner une adresse email.";
            return res.status(401).json({ message });
        } else if (req.body.password === '') {
            const message = "Veuillez renseigner un mot de passe.";
            return res.status(401).json({ message });
        } else {
            db.users.findOne({
                where: { email: req.body.email }
            }).then((user => {

                if (!user) {
                    const message = 'L\'utilisateur demandé n\'existe pas';
                    return res.status(400).json({ message })
                }
                bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                    if (!isPasswordValid) {
                        const message = 'Le mot de passe est incorrect';
                        return res.status(401).json({ message })
                    }

                    // Création du jéton pour chaque user avec jwt
                    const jeton = jwt.sign(
                        { id: user.id },
                        primaryKey,
                        { expiresIn: "2h" }
                    )

                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.json({ message, jeton })
                })
            }))

                .catch(err => {
                    const message = `L'utilisateur n'a pas pu être connecté`;
                    return res.json({ message, data: err })
                })
        }
    })
}