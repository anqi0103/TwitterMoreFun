const Twit = require('twit');
const model = require('../database/index.js');
const config = require('../config.js');

const T = new Twit({
  consumer_key: `${config.consumer_key}`,
  consumer_secret: `${config.consumer_secret}`,
  access_token: `${config.access_token}`,
  access_token_secret: `${config.access_token_secret}`,
});

const mapUsers = (data) => {
  return data.users.map((user) => ({
    id: user.id,
    name: user.name,
    screen_name: user.screen_name,
    profile_image_url: user.profile_image_url,
    profile_banner_url: user.profile_banner_url,
  }));
};

model.mongoose.connection.dropCollection('friends', (err, result) => {
  console.log('Friends Collection dropped');

  model.mongoose.connection.dropCollection('tweets', (err, result) => {
    console.log('Tweets Collection dropped');

    T.get('friends/list', {}, (err, data, response) => {
      console.log(data);
      console.log('Step 1');
      const users = mapUsers(data);
      console.log('Step 2');
      model.Friend.insertMany(users, (err, data) => {
        console.log('Step 3');
        if (err) {
          console.log(err);
        }
      });
      T.get(
        'friends/list',
        { cursor: data.next_cursor_str },
        (err, data, response) => {
          console.log('Step 4');
          const users = mapUsers(data);
          model.Friend.insertMany(users, (err, data) => {
            console.log('Step 5');
            if (err) {
              console.log(err);
            }
          });
        }
      );

      for (let i = 0; i < data.users.length; i++) {
        let user_id = data.users[i].id;
        T.get(
          'statuses/user_timeline',
          { count: 50, user_id: user_id },
          (err, data, response) => {
            const tweets = data.map((tweet) => ({
              id_str: tweet.id_str,
              created_at: tweet.created_at,
              user_id: tweet.user.id,
              text: tweet.text,
            }));

            model.twittTimeline.insertMany(tweets, (err, data) => {
              if (err) {
                console.log(err);
              }
              console.log('Finished Insert Tweets for user_id', user_id);
            });
          }
        );
      }
    });
  });
});
