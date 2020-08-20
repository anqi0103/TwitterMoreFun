import React from 'react';
import FriendItem from './Profile';

const ListOfFriends = (props) => (
  <div>
    {props.profile.map((item) => <FriendItem key={item.id} friend={item} />)}
  </div>
)

export default ListOfFriends;