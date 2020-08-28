import React from 'react';

const TweetItem = (props) => {
  let profileImageUrl = null;
  if (props.tweet.user.length !== 0) {
    profileImageUrl = props.tweet.user[0].profile_image_url;
  }

  const date = new Date(props.tweet.created_at);
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  });
  const dateValue = dateTimeFormat.format(date);
  return (
    <div className="App-tweet">
      <div>
        <img className="App-img" alt="" src={profileImageUrl} />
      </div>
      <div className="App-tweet-display">
        <div>{props.tweet.text}</div>
        <div className="App-like-time">
          <button className="btn">
            <i class="fa fa-like" style={{ marginRight: 5 }}>
              Like
            </i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
                fill="white"
              />
            </svg>
          </button>
          <div className="App-create-time">{`${dateValue}`}</div>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
