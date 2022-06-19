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
db.generates = require('./generateurCode.js')(sequelize, DataTypes);
db.partenaires = require('./partenaireModel.js')(sequelize, DataTypes);
db.comptes = require('./compteModel.js')(sequelize, DataTypes);
db.videos = require('./videoModel.js')(sequelize, DataTypes);
db.usersboutiques = require('./userBoutiqueModel.js')(sequelize, DataTypes);
db.codescopies = require('./codeCopiesModel')(sequelize, DataTypes);
db.prices = require('./prixVideoModel.js')(sequelize, DataTypes);

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

// RELATION 1-N 
db.prices.hasMany(db.videos, {
    as: 'videos'
})

db.videos.belongsTo(db.prices, {
    foreignKey: 'priceId',
    as: 'prices'
})

// RELATION 1-N CATEGORIES-TRANSACTIONS
db.categories.hasMany(db.transactions, {
    as: 'transactions'
});

db.transactions.belongsTo(db.categories, {
    foreignKey: 'categoryId',
    as: 'categories'
});

// RELATION 1-N PARTENAIRES-CATEGORIES
db.categories.hasMany(db.partenaires, {
    as: 'partenaires'
})

db.partenaires.belongsTo(db.categories, {
    foreignKey: 'categoryId',
    as: 'categories'
})

// RELATION 1-N comptes partenaires
db.partenaires.hasMany(db.comptes, {
    as: 'comptes'
})

db.comptes.belongsTo(db.partenaires, {
    foreignKey: 'partenaireId',
    as: 'partenaires'
})

// RELATION 1-N Partenaires Transaction
db.partenaires.hasMany(db.transactions, {
    as: 'transactions',
})

db.transactions.belongsTo(db.partenaires, {
    foreignKey: 'partenaireId',
    as: 'partenaires'
})

// RELATION 1-N users usersBoutiques
db.users.hasMany(db.usersboutiques, {
    as: 'usersboutiques'
})

db.usersboutiques.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users'
})

// RELATION 1-N usersboutiques vidéos
db.usersboutiques.hasMany(db.videos, {
    as: 'videos'
})

db.videos.belongsTo(db.usersboutiques, {
    foreignKey: 'usersboutiqueId',
    as: 'usersboutiques'
})

// RELATION 1-N Comptes UsersBoutiques
db.usersboutiques.hasMany(db.comptes, {
    as: 'comptes'
})

db.comptes.belongsTo(db.usersboutiques, {
    foreignKey: 'usersboutiqueId',
    as: 'usersboutiques'
})

// RELATION 1-N users partenaires

db.users.hasMany(db.partenaires, {
    as: 'partenaires'
})

db.partenaires.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users'
})

module.exports = db
