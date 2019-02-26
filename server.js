// server.js
// where your node app starts

// init project
require('dotenv').config();
const {APIKEY, NODE_ENV} = process.env;
if (!NODE_ENV) {
  console.error('NODE_ENV not defined');
  process.exit(1);
}
const DEBUG = NODE_ENV === 'development';

const express = require('express');
const app = express();
const axios = require('axios');
const GBOOKS = 'https://www.googleapis.com/books/v1/volumes';

if (DEBUG) {
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler, {}));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('public'));
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
  console.log(
    `Mode: ${NODE_ENV}. Your app is listening on port ` +
      listener.address().port,
  );
});
