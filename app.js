require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendGrid/mail');
const app = express();
const api_key = process.env.API_KEY;

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Controller-Allow-Origin', '*');
    res.setHeader('Access-Controller-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Controller-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});


app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey(api_key)
    const msg = {
        to: 'danimatton@gmail.com',
        from: req.body.email,
        subject: 'Website Contact',
        text: req.body.message
    }

    sendGrid.send(msg)
    .then(result => {
        res.status(200).json({
            success: true
        })
    })
    .catch(err => {
        console.log('error', err);
        res.status(401).json({
            success: false
        })
    })
})

app.listen(3030, '0.0.0.0');