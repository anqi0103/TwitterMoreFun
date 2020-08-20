const Twit = require('twit');
const model = require('../database/index.js');
const config = require('../config.js');


const T = new Twit({
  consumer_key: `${config.consumer_key}`,
  consumer_secret: `${config.consumer_secret}`,
  access_token: `${config.access_token}`,
  access_token_secret: `${config.access_token_secret}`
})

T.get('friends/list', {}, (err, data, response) => {
  console.log(data);
  model.mongoose.connection.dropCollection(
    'friends',
    (err, result) => {
      console.log('Collection dropped');

      const users = data.users.map((user) => (
        {
          id: user.id,
          name: user.name,
          screen_name: user.screen_name,
          profile_image_url: user.profile_image_url
        }
      ));

      model.Friend.insertMany(
        users,
        (err, data) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
});

T.get('statuses/home_timeline', {}, (err, data, response) => {
  model.mongoose.connection.dropCollection(
    'twitts',
    (err, result) => {
      console.log('Collection dropped second!!!');

      const tweets = data.map((tweet) => (
        {
          id_str: tweet.id_str,
          created_at: tweet.created_at,
          user_id: tweet.user.id,
          text: tweet.text
        }
      ));

      model.twittTimeline.insertMany(
        tweets,
        (err, data) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
});