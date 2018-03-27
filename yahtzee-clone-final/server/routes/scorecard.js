const express = require('express');
const scorecardRoutes = express.Router();
const Scorecard = require('../models/scorecard');

scorecardRoutes.get('/:id', (req, res) => {
    Scorecard.findById((err, req.body) => {
        if(err) return res.status(500).send(err);
        return res.send()
    })
})


module.exports = scorecardRoutes;
