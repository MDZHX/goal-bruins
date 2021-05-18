import React, { useState } from 'react';

import Button from '../Button/Button';

import "./Goal.css";

function LikeButton(props) {
  const [liked, setLiked] = useState(false);
  // TODO: Fix icon issue
  const icon = liked ? "fas fa-heart" : "far fa-heart";
  
  const handleClick = () => {
    setLiked(!liked);
    props.onClick(liked);
  }

  return (
    <Button onClick={handleClick}>
      <div className="like-button-container">
        <i className={icon}></i>
        <span className="like-button-text">{props.likes}</span>
      </div>
    </Button>
  );
}

function SubscribeButton(props) {
  const [subscribed, setSubscribed] = useState(false);
  // TODO: Fix icon issue
  const icon = subscribed ? "fas fa-plus-square" : "far fa-plus-square";
  const text = subscribed ? "Remove from My Goals" : "Add to My Goals";

  return (
    <Button onClick={() => {setSubscribed(!subscribed)}}>
      <div className="subscribe-button-container">
        <i className={icon}></i>
        <span className="subscribe-button-text">{text}</span>
      </div>
    </Button>
  );
}

function Goal(props) {
  const [likes, setLikes] = useState(0);

  const likeClicked = (liked) => {
    setLikes(liked ? likes - 1 : likes + 1);
  }

  return (
    <div className="goal-card">
      <div className="goal-card-info">
        <div className="goal-card-text">
          <h3>{props.name}</h3>
          <p>{props.desc}</p>
        </div>
        <ul className="goal-card-button-group">
          <li>
            <LikeButton likes={likes} onClick={likeClicked} />
          </li>
        </ul>
      </div>
      <div className="goal-card-subscribe">
        <SubscribeButton />
      </div>
    </div>
  );
}

export default Goal