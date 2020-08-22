import React from 'react';
import FriendItem from './Profile';

const ListOfFriends = (props) => (
  <div className="App-friends">
    {props.profile.map((item) => (
      <FriendItem
        key={item.id}
        friend={item}
        onClickProfile={props.onProfileClick}
      />
    ))}
  </div>
);

export default ListOfFriends;
