
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

const blackjack = require('./routes/blackjack.route');
app.use('/' , blackjack );

const quizz = require('./routes/quizz.route');
app.use('/' , quizz );


app.use((req, res) => {
    res.status(404).json({
        message :'La page demandée n existe pas',
        path : req.originalUrl
});

});

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur backend lancé sur le port ${PORT}`));
