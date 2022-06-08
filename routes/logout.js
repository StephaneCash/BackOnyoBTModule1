const jwt = require('jsonwebtoken')
const primaryKey = require('../auth/private_key')


module.exports = (app, req, res, next) => {
    app.delete('/api/logout/:id', (req, res) => {

        if (req.user.id === req.params.id) {
            res.status(200).json('User supprimé avec succès');
        } else {
            res.status(403).json('Vous ne pouvez pas supprimé cet utilisateur');
        }
    })

}