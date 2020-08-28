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

const getTweetsForEachUser = (friendsData) => {
  for (let i = 0; i < friendsData.users.length; i++) {
    let user_id = friendsData.users[i].id_str;
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
        });
      }
    );
  }
};

model.mongoose.connection.dropCollection('friends', (err, result) => {
  model.mongoose.connection.dropCollection('tweets', (err, result) => {
    T.get('friends/list', {}, (err, data, response) => {
      getTweetsForEachUser(data);
      const users = mapUsers(data);

      model.Friend.insertMany(users, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      T.get(
        'friends/list',
        { cursor: data.next_cursor_str },
        (err, data, response) => {
          getTweetsForEachUser(data);
          const users = mapUsers(data);

          model.Friend.insertMany(users, (err, data) => {
            if (err) {
              console.log(err);
            }
          });
        }
      );
    });
  });
});
