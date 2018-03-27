const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscoreSchema = ({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Highscores", highscoreSchema);
