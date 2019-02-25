// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const GBOOKS = 'https://www.googleapis.com/books/v1/volumes';
const APIKEY = process.env.APIKEY;

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(devMiddleware(compiler, {}));

app.use(require('webpack-hot-middleware')(compiler));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/lookup', async (req, res) => {
  const {q} = req.query;
  if (!q) return res.json(null);

  try {
    let result = await axios.get(GBOOKS, {
      params: {q, key: process.env.APIKEY},
    });
    res.json(result.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
