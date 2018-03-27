const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scorecardSchema = ({
    ones: {
        type: Number,
        required: true
    },
    twos: {
        type: Number,
        required: true
    },
    threes: {
        type: Number,
        required: true
    },
    fours: {
        type: Number,
        required: true
    },
    fives: {
        type: Number,
        required: true
    },
    sixes: {
        type: Number,
        required: true
    },
    threeOfAKind: {
        type: Number,
        required: true
    },
    fourOfAKind: {
        type: Number,
        required: true
    },
    fullHouse: {
        type: Number,
        required: true
    },
    smallStraight: {
        type: Number,
        required: true
    },
    largeStraight: {
        type: Number,
        required: true
    },
    yahtzee: {
        type: Number,
        required: true
    },
    chance: {
        type: Number,
        required: true
    },
    yahtzeeBonus: [Number]
})


module.exports = mongoose.model("")
