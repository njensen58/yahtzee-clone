const express = require('express');
const adminRoutes = express.Router();
const Highscore = require('../models/highscores');





adminRoutes.get('/', (req, res) => {
    Highscore.find((err, scores) => {
        if (err) return res.status(500).send(err);
        return res.send(scores);
    })
})

adminRoutes.put('/:id', (req, res) => {
    Highscore.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedScore) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedScore);
    })
})

adminRoutes.delete('/:id', (req, res) => {
    Highscore.findByIdAndRemove(req.params.id, (err, deletedScore) => {
        if (err) return res.status(500).send(err);
        return res.send(deletedScore);
    })
})



module.exports = adminRoutes;
