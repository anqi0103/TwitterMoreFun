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
      tweets: []
    }
  }


  getListOfFriends(data) {
    axios.get(ENDPOINTFriend)
      .then(response => {
        this.setState({data: response.data});
      })
      .catch(console.log);
  }

  getListOfTweets(data) {
    axios.get(ENDPOINTTweet)
      .then(response => {
        console.log("Get all the tweets", response);
        this.setState({tweets: response.data});
      })
      .catch(console.log)
  }

  componentDidMount() {
    this.getListOfFriends();
    this.getListOfTweets();
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div className="App-friends">
            <ListOfFriends profile={this.state.data}/>
          </div>
          <div className="App-tweets">
            <div className="App-user-profile">
              <img className="App-backgroud-image" alt="" src="https://www.fugenx.com/wp-content/uploads/2018/09/groups-header-background-2.png"/>
            </div>
            <div>
              <ListOfTweets tweetInfo={this.state.tweets}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;