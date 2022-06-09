const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connexion réussie à la base de données');
    }).catch((err) => {
        console.log("Erreur : ", err);
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.transactions = require("./transactionModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
db.categories = require("./categorieTransfertModel.js")(sequelize, DataTypes);


db.sequelize.sync({ force: false }).then(() => {
    console.log('Mdels synchronisés ')
})

// RELATION 1-N TRANSACTIONS-USERS

db.users.hasMany(db.transactions, {
    as: 'transactions'
});

db.transactions.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users'
})

// RELATION 1-N CATEGORIES-TRANSACTIONS

db.categories.hasMany(db.transactions, {
    as: 'transactions'
});

db.transactions.belongsTo(db.users, {
    foreignKey: 'categorieId',
    as: 'categorie'
})

module.exports = db
