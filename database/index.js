const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECT);

let friendSchema = new mongoose.Schema({
  id: Number,
  name: String,
  screen_name: String,
  profile_image_url: String,
  profile_banner_url: String,
});

let twittTimelineSchema = new mongoose.Schema({
  id_str: String,
  created_at: String,
  user_id: Number,
  text: String,
});

let Friend = mongoose.model('friends', friendSchema);
let twittTimeline = mongoose.model('tweets', twittTimelineSchema);

module.exports.Friend = Friend;
module.exports.twittTimeline = twittTimeline;
module.exports.mongoose = mongoose;
