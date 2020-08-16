const express = require('express');
const path = require('path');
const app = express();
const model = require('../database/index.js');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../src'));
app.use(bodyParser.json());

app.get('/friends', (req, res) => {
  model.Friend.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/twitts', (req, res) => {
  model.twittTimeline.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

let port = 1120;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
