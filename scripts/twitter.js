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
  let promises = [];
  for (let i = 0; i < data.users.length; i++) {
    let newPromise = new Promise((resolve, reject) => {
      model.Friend.update(
        {id: data.users[i].id},
        {
          id: data.users[i].id,
          name: data.users[i].name,
          screen_name: data.users[i].screen_name, profile_background_image_url: data.users[i].profile_background_image_url
        },
        {upsert: true},
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    });
    promises.push(newPromise);
  }
  Promise.all(promises).then(() => {
    console.log('Finished friend list!!');
  })
})

T.get('statuses/home_timeline', {}, (err, data, response) => {
  let promises = [];
  for (let i = 0; i < data.length; i++) {
    let newPromise = new Promise((resolve, reject) => {
      model.twittTimeline.update(
        {id_str: data[i].id_str},
        {
          id_str: data[i].id_str,
          created_at: data[i].created_at,
          user_id: data[i].user.id,
          text: data[i].text
        },
        {upsert: true},
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      )
    });
    promises.push(newPromise);
  }
  Promise.all(promises).then(() => {
    console.log('Finished home timeline!!!!');
  })
})