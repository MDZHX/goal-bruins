import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Nav from '../../components/Nav/Nav';
import Goal from '../../components/Goal/Goal'
import CreateGoal from '../../components/CreateGoal/CreateGoal';
// import MyGoalOptionBar from '../../components/MyGoal/MyGoalOptionBar.js'

function MyGoals() {
  const [userGoals, setUserGoals] = useState([]);

  useEffect(()=>{
    async function fetchUserGoals() {
      const result = await axios
      .get('http://localhost:5000/goal/all-goals');

      console.log("sample", result.data[0]);
      // TODO: error handling
      setUserGoals(result.data);
    }
    fetchUserGoals();
  },[]);

  const createGoal = (goal, setName, setDescription) => {
    axios
    .post('http://localhost:5000/goal/add-goal', goal)
    .then(res => {
      // TODO: error handling
      setUserGoals([res.data].concat(userGoals));
      setName("");
      setDescription("");
    });
  }

  // //op:0 to set Goals, 1 to set display option (archived?Today?All?)
  // function setPersonalGoal(op, newVal){ 
  //   if(op === 0){
  //     const diff = newVal.filter(item=>!personalGoals.includes(item));
  //     console.log(diff.length);
  //     if(diff.length > 0)
  //     {
  //       for(var i =0; i<diff.length; i++){
  //         console.log("NEW POSTING:",diff[i].name,diff[i].description);
  //         axios.post('http://localhost:5000/goal/add-goal', {name:diff[i].name,description:diff[i].description});
  //       }
  //     }
  //     console.log(newVal)
  //     setPersonalGoals(newVal);
  //   }
  //   else
  //     setDisplayOption(newVal);
  // }

  const userGoalList = userGoals.map(goal =>
    <Goal
      key={goal._id}
      id={goal._id}
      name={goal.name}
      desc={goal.description}
    />
  );

  return (
    <>
      <Nav />
      {/* TODO: Modify the option bar */}
      {/* <MyGoalOptionBar data={personalGoals} onChange={setPersonalGoal} /> */}
      <CreateGoal createGoal={createGoal} />
      <div>
        {userGoalList}
      </div>
    </>
  );
};

export default MyGoals;
