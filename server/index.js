const express = require('express');
const path = require('path');
const app = express();
const model = require('../database/index.js');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname + '/../src')));
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
  // model.twittTimeline.find({})
  //   .then((result) => {
  //     res.status(200).send(result);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });

  model.twittTimeline
    .aggregate([
      { $match: { user_id: Number(req.query.user_id) } },
      {
        $lookup: {
          from: 'friends', // collection name in db
          localField: 'user_id',
          foreignField: 'id',
          as: 'user',
        },
      },
    ])
    .exec(function (err, tweets) {
      res.status(200).send(tweets);
    });
});

let port = 1120;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
