import React from 'react';

const FriendItem = (props) => (
  <div className="App-friend">
    <img className="App-profile App-img" alt="" src={props.friend.profile_image_url}/>
    <div>
      <div>{props.friend.name}</div>
      <div>@{props.friend.screen_name}</div>
    </div>
  </div>
)

export default FriendItem;