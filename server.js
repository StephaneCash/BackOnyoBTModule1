const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

// Routes
const router = require('./routes/TransactionsRouter.js')
app.use('/api/transactions', router);

const categoryRouter = require('./routes/CategoryRouter.js');
app.use('/api/categories', categoryRouter);

const codeGenereRouter = require('./routes/GenerateRouter.js');
app.use('/api/generates', codeGenereRouter);

const paternaireRouter = require('./routes/PartenaireRouter.js');
app.use('/api/partenaires', paternaireRouter);

const compteRouter = require('./routes/CompteRouter.js');
app.use('/api/comptes', compteRouter);

const userStreamingRouter = require('./routes/UserBoutiqueRouter.js');
app.use('/api/users-streaming', userStreamingRouter);

const videoRouter = require('./routes/VideoRouter.js');
app.use('/api/videos', videoRouter);

const codesCopiesRouter = require('./routes/CodesCopiesRouter.js');
app.use('/api/codesCopies', codesCopiesRouter);

const prixVideoRouter = require('./routes/PrixVideosRouter.js');
app.use('/api/prix-videos', prixVideoRouter)

const routerUser = require('./routes/UserRouter');
app.use('/api/users', routerUser);
require('./routes/Login.js')(app);
require('./routes/logout.js')(app);

//port
const PORT = process.env.PORT || 5000;

//Serveur
app.listen(PORT, () => {
    console.log("Le serveur a bien démarré au port " + PORT);
})