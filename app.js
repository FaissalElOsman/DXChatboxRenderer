const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const replace = require('replace-in-file');
const ports = require('./config/ports');

const app = express();;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json();
    }
    next();
});
const options = {
    files: './public/index.js',
    from: [
      '{{$URL}}'
    ],
    to: [
        process.env.HEROKU_IS_ON_CLOUD == 'TRUE'?`https://dx-rainbow-gateway.herokuapp.com`:`http://localhost:${ports.DX_RAINBOW_GATEWAY_PORT}`,
    ]
  };

  fs.copyFile('./public/index.js.orig', './public/index.js', (err) => {
    replace(options).then(changes => {
      });
  });
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;