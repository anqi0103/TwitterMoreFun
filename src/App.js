import React from 'react';
import axios from 'axios';
import ListOfFriends from './ListOfFriends';
import ListOfTweets from './ListOfTweets';
import './App.css';

let ENDPOINTFriend = '/friends';
let ENDPOINTTweet = '/twitts';

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

  getListOfFriends(data) {
    axios
      .get(ENDPOINTFriend)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch(console.log);
  }

  getListOfTweets(data) {
    axios
      .get(ENDPOINTTweet)
      .then((response) => {
        console.log('Get all the tweets', response);
        this.setState({ tweets: response.data });
      })
      .catch(console.log);
  }

  onProfileClick(userId) {
    let selectedFriend = this.state.data.find((friend) => friend.id === userId);
    // console.log('selectedFriend', selectedFriend);
    this.setState({ selectedUser: selectedFriend });
  }

  componentDidMount() {
    this.getListOfFriends();
    this.getListOfTweets();
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
              <div className="App-user-profile">
                <div
                  className="App-backgroud-image"
                  style={{
                    background: `url(${selectedUserBackgroundImage}/web_retina)`,
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
