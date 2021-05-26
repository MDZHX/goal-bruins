import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Goal from '../../components/Goal/Goal';
import Nav from '../../components/Nav/Nav';
import Button from '../../components/Button/Button'

import './Discover.css'

function Discover(){
  const [goals, setGoals] = useState([]);
  const [itemRendered, setItemRendered] = useState(10);

  useEffect(()=>{
    async function fetchGoals() {
      const result = await axios
      .get('http://localhost:5000/goal/all-goals');
      
      // TODO: error handling
      setGoals(result.data);
    }

    fetchGoals();
  },[]);

  // const [login, setLogin]=useState();

  // const config={
  //   header:{
  //     Authorization:'Bearer'+ localStorage.getItem('token')
  //   }
  // };
  // axios.get('http://localhost:5000/', config)
  // .then(
  //   (res)=>{
  //     setLogin({
  //       login:res.data
  //     });
  //   }
  // )

  function expandList() {
    setItemRendered(itemRendered+4);
  }

  const goalList = goals
  .slice(0, itemRendered)
  .map(goal => <Goal key={goal.id} name={goal.name} desc={goal.desc}/>);

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
      <Nav/>
      <div className="goals">
          {goalList}
          <AddGoalButton></AddGoalButton>
      </div>
    </>
  )

}

export default Discover;
