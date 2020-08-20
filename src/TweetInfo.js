import React from 'react';

const TweetItem = (props) => {
  let profileImageUrl = null
  if (props.tweet.user.length !== 0) {
    profileImageUrl = props.tweet.user[0].profile_image_url;
  }
  return (
    <div className="App-tweet">
      <img className="App-img" alt="" src={profileImageUrl} />
      <div className="App-tweet-display">
        <div>{props.tweet.text}</div>
        <div>
          <button>Like</button>
          <div className="App-tweet-time">{props.tweet.created_at}</div>
        </div>
      </div>
    </div>
  )
}

export default TweetItem;