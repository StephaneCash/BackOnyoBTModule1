const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

// Routes
const router = require('./routes/TransactionsRouter.js')
app.use('/api/transactions', router)

const routerUser = require('./routes/UserRouter');
app.use('/api/users', routerUser);

//port
const PORT = process.env.PORT || 5000;

//Serveur
app.listen(PORT, () => {
    console.log("Le serveur a bien démarré au port " + PORT);
})