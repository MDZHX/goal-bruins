import React, { useState } from 'react';
import axios from 'axios';

import Button from '../Button/Button';

import "./Goal.css";

function LikeButton(props) {
  const icon = "fas fa-heart";
  const text = props.liked ? "Unlike" : "Like";

  return (
    <Button onClick={props.toggleLike}>
      <div className="like-button-container">
        <div className="like-button-display">
          <span className="like-button-text">{props.likes}</span>
          <i className={icon}></i>
        </div>
        <span className="like-button-text">{text}</span>
      </div>
    </Button>
  );
}

function FollowButton(props) {
  const icon = "fas fa-plus-square";
  const text = props.followed ? "Unfollow" : "Follow";

  return (
    <Button onClick={props.toggleFollow}>
      <div className="follow-button-container">
        <i className={icon}></i>
        <span className="follow-button-text">{text}</span>
      </div>
    </Button>
  );
}

function Goal(props) {
  const [liked, setLiked] = useState(props.liked);
  const [followed, setFollowed] = useState(props.followed);
  const [likes, setLikes] = useState(props.likes);

  const toggleLike = () => {
    console.log("Toggle like status", liked);
    console.log("Goal id is", props.id);
    if (liked) {
      axios.patch(
        'http://localhost:5000/user/unlike-goal',
        { jwt_token: JSON.parse(localStorage.getItem("token")), goalId: props.id }
      )
      .then(() => {
        setLiked(false);
        setLikes(likes - 1);
      })
      .catch(err => alert(err));
    }
    else {
      axios.patch(
        'http://localhost:5000/user/like-goal',
        { jwt_token: JSON.parse(localStorage.getItem("token")), goalId: props.id }
      )
      .then(() => {
        setLiked(true);
        setLikes(likes + 1);
      })
      .catch(err => alert(err));
    }
  }

  const toggleFollow = () => {
    console.log("Toggle follow, current status", followed);
    console.log("Goal id is", props.id);
    if (followed) {
      axios.patch(
        'http://localhost:5000/user/unfollow-goal',
        { jwt_token: JSON.parse(localStorage.getItem("token")), goalId: props.id }
      )
      .then(() => {
        setFollowed(false);
        if (props.removeGoal) {
          props.removeGoal(props.id);
        }
      })
      .catch(err => alert(err.message));
    }
    else {
      axios.patch(
        'http://localhost:5000/user/follow-goal',
        { jwt_token: JSON.parse(localStorage.getItem("token")), goalId: props.id }
      )
      .then(() => {
        setFollowed(true);
      })
      .catch(err => alert(err.message));
    }
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
            <LikeButton liked={liked} likes={likes} toggleLike={toggleLike} />
          </li>
        </ul>
      </div>
      <div className="goal-card-follow">
        <FollowButton followed={followed} toggleFollow={toggleFollow} />
      </div>
    </div>
  );
}

export default Goal;
