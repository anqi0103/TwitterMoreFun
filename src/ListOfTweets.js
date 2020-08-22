import React from "react";
import TweetItem from "./TweetInfo";

const ListOfTweets = (props) => (
  <div>
    {props.tweetInfo.map((element) => (
      <TweetItem keyTwo={element.id} tweet={element} />
    ))}
  </div>
);

export default ListOfTweets;
