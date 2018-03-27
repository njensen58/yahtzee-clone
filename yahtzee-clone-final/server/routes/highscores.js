const express = require('express');
const highscoreRoutes = express.Router();
const Highscore = require('../models/highscores');


highscoreRoutes.get('/', (req, res) => {
    Highscore.find((err, scores) => {
        if(err) return res.status(500).send(err);
        return res.send(scores);
    })
})


highscoreRoutes.post('/', (req, res) => {
    const newScore = new Highscore(req.body);
    newScore.save(err => {
        if (err) return res.status(500).send(err);
        return res.send(newScore);
    })
})


module.exports = highscoreRoutes;
