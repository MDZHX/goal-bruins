import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Goal from '../../components/Goal/Goal';
import Nav from '../../components/Nav/Nav';
import Button from '../../components/Button/Button'

import './Discover.css'

function Discover({ fetchSearchResults }) {
  const [goals, setGoals] = useState([]);
  const [itemRendered, setItemRendered] = useState(10);

  useEffect(() => {
    axios
    .post('http://localhost:5000/user/discover-page', { jwt_token: JSON.parse(localStorage.getItem("token")), history:[]})
    .then((result) => {
      setGoals(result.data);
    })
    .catch((error) => {
      alert(error);
    })
  }, []);

  function expandList() {
    axios
    .post('http://localhost:5000/user/discover-page',{jwt_token:JSON.parse(localStorage.getItem("token")),history:[...goals]})
    .then((result) => {
      setGoals([...goals].concat(result.data));
    })
    .catch((error) => {
      alert(error);
    })
    //setItemRendered(itemRendered+4);
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

  function AddGoalButton(){
    return(
      <div >
        <Button onClick = {expandList}>
          <div className="expansion-button">
              Load More Goals...
          </div>
        </Button>
      </div>
    )
  }

  return(
    <>
      <Nav fetchSearchResults={fetchSearchResults} />
      <div className="goals">
          {goalList}
          <AddGoalButton />
      </div>
    </>
  )

}

export default Discover;
