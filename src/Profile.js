import React from 'react';

class FriendItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClickProfile(this.props.friend.id);
  }

  render() {
    return (
      <div className="App-friend" onClick={this.onClick}>
        <img
          className="App-profile App-img"
          alt=""
          src={this.props.friend.profile_image_url}
        />
        <div>
          <div>{this.props.friend.name}</div>
          <div className="App-profile-screenName">
            @{this.props.friend.screen_name}
          </div>
        </div>
      </div>
    );
  }
}
export default FriendItem;
