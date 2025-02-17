import React from 'react';
// Make REST request
import axios from 'axios';
import ListOfFriends from './ListOfFriends';
import ListOfTweets from './ListOfTweets';
import './App.css';

let ENDPOINTFriend = '/friends';
let ENDPOINTTweet = '/twitts';

// class component which can hold state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tweets: [],
      selectedUser: null,
    };
    this.onProfileClick = this.onProfileClick.bind(this);
  }

  getListOfFriends() {
    axios
      .get(ENDPOINTFriend)
      .then((response) => {
        this.setState({ data: response.data });
        this.onProfileClick(response.data[0].id);
      })
      .catch(console.log);
  }

  getListOfTweets(userId) {
    axios
      .get(ENDPOINTTweet + `/?user_id=${userId}`)
      .then((response) => {
        this.setState({ tweets: response.data });
      })
      .catch(console.log);
  }

  onProfileClick(userId) {
    let selectedFriend = this.state.data.find((friend) => friend.id === userId);
    this.getListOfTweets(userId);
    this.setState({ selectedUser: selectedFriend });
  }

  componentDidMount() {
    this.getListOfFriends();
  }

  render() {
    let selectedUserProfileImage = null;
    let selectedUserBackgroundImage = null;
    if (this.state.selectedUser != null) {
      selectedUserProfileImage = this.state.selectedUser.profile_image_url.replace(
        '_normal',
        ''
      );
      selectedUserBackgroundImage = this.state.selectedUser.profile_banner_url;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-header-title">TwitterFun</h1>
        </div>
        <div className="App-body">
          <ListOfFriends
            profile={this.state.data}
            onProfileClick={this.onProfileClick}
          />
          <div className="App-tweets">
            <div style={{ width: '500px', margin: '0 auto' }}>
              <div
                className="App-user-profile"
                style={{ width: '500px', height: '300px' }}
              >
                <div
                  className="App-backgroud-image"
                  style={{
                    backgroundImage: `url(${selectedUserBackgroundImage}/web_retina)`,
                  }}
                />
                <img
                  className="App-user-profile-image"
                  alt=""
                  src={selectedUserProfileImage}
                />
              </div>
              <div>
                <ListOfTweets tweetInfo={this.state.tweets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
