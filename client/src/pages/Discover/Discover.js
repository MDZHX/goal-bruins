import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Goal from '../../components/Goal/Goal';
import Nav from '../../components/Nav/Nav';
import Button from '../../components/Button/Button'

import './Discover.css'

function Discover({ fetchSearchResults }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios
    .post('http://localhost:5000/user/discover-page', { jwt_token: JSON.parse(localStorage.getItem("token")), history:[]})
    .then(result => {
      console.log("Fetched recommended goals", result);
      setGoals(result.data);
    })
    .catch(error => {
      alert(error);
    })
  }, []);

  
  function expandList() {
    const idList = goals.map((goal)=>{return goal._id});
    axios
    .post('http://localhost:5000/user/discover-page',{jwt_token:JSON.parse(localStorage.getItem("token")), history:idList})
    .then(result => {
      console.log("Fetched more recommended goals", result);
      setGoals([...goals].concat(result.data));
    })
    .catch(error => {
      alert(error);
    })
  }

  const goalList = goals.map(goal =>
    <Goal
      key={goal._id}
      id={goal._id}
      name={goal.name}
      desc={goal.description}
      likes={goal.likes}
      liked={goal.liked}
      followed={goal.followed}
    />
  );

  function LoadMore() {
    return (
      <div>
        <Button onClick = {expandList}>
          <div className="expansion-button">
              Load More Goals...
          </div>
        </Button>
      </div>
    );
  }

  return(
    <>
      <Nav fetchSearchResults={fetchSearchResults} />
      <div className="goals">
          {goalList}
      </div>
      <LoadMore />
    </>
  )

}

export default Discover;
