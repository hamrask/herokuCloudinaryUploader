const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const file = require('./routes/file');

app.get('/', (req, res) => {
    try {
        return res.json({message: 'its working'});
    } catch(error) {
        return res.status(500).json(error);
    }
});

app.use('/upload', file);

app.listen(process.env.PORT, () => {
    console.log('server started', process.env.PORT);
});