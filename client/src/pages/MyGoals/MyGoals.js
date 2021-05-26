import React, { useState, useEffect } from 'react';

import Nav from '../../components/Nav/Nav';
import MyGoal from '../../components/MyGoal/MyGoal.js'
import MyGoalOptionBar from '../../components/MyGoal/MyGoalOptionBar.js'

import axios from 'axios'


const MyGoals=()=>{
  const [personalGoals, setPersonalGoals]=useState([]);
  //first option: archieved, second: today
  const [displayOption,setDisplayOption]=useState([false,false]);

  useEffect(()=>{
    async function fetchGoals() {
      const result = await axios
      .get('http://localhost:5000/goal/all-goals');

      // TODO: error handling
      setPersonalGoals(result.data);
    }
    fetchGoals();
  },[]);

  //op:0 to set Goals, 1 to set display option (archived?Today?All?)
  function setPersonalGoal(op, newVal){ 
    if(op === 0){
      const diff = newVal.filter(item=>!personalGoals.includes(item));
      console.log(diff.length);
      if(diff.length > 0)
      {
        for(var i =0; i<diff.length; i++){
          console.log("NEW POSTING:",diff[i].name,diff[i].description);
          axios.post('http://localhost:5000/goal/add-goal', {name:diff[i].name,description:diff[i].description});
        }
      }
      console.log(newVal)
      setPersonalGoals(newVal);
    }
    else
      setDisplayOption(newVal);
  }

  const personalGoalList = personalGoals.map((goal) => {
    if(!displayOption[0]) {
      return (
        <MyGoal 
          id={goal.id}
          name={goal.name} 
          description={goal.description} 
          onChange={setPersonalGoal}
          data = {personalGoals}>
        </MyGoal>
      );
    }

    else {
      return (
        <MyGoal 
          id={goal.id}
          name={goal.name} 
          description={goal.description} 
          onChange={setPersonalGoal}
          data = {personalGoals}>
        </MyGoal>
      );
    }
  });

  return (
  <>
    <Nav />
    <MyGoalOptionBar data={personalGoals} onChange={setPersonalGoal} />
    <div>
      {personalGoalList}
    </div>
  </>
  );
};

export default MyGoals;
