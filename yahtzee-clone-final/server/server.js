const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(morgan('dev'));



mongoose.connect('mongodb://localhost/yahtzeeClone', (err) => {
    if (err) throw err;
    console.log('Connected to the database');
})



app.use('/highscores', require('./routes/highscores'));
app.use('/admin-almighty', require('./routes/admin'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
