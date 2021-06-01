import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Nav from '../../components/Nav/Nav';
import Goal from '../../components/Goal/Goal'
import CreateGoal from '../../components/CreateGoal/CreateGoal';
import MyGoalOptionBar from '../../components/MyGoalsOptionBar/MyGoalOptionBar'
// import MyGoal from '../../components/MyGoal/MyGoal'
import './MyGoals.css'


function MyGoals({ fetchSearchResults }) {
  const [userGoals, setUserGoals] = useState([]);
  const [displayOption, setDisplayOption] = useState([false, false]);// first option: archived, second: today
  
  useEffect(() => {
    axios
    .patch('http://localhost:5000/user/show-followed', { jwt_token: JSON.parse(localStorage.getItem("token")) })
    .then(result => {
      console.log("Fetched followed goals", result);
      setUserGoals(result.data);
    })
    .catch(error => {
      alert(error);
    });
  }, []);

  const createGoal = (name, description, setName, setDescription) => {
    axios
    .patch('http://localhost:5000/user/create-goal',
          {
            jwt_token: JSON.parse(localStorage.getItem("token")), 
            goal_name: name,
            goal_description: description,
          })
    .then(res => {
      setUserGoals([res.data].concat(userGoals));
      setName("");
      setDescription("");
    })
    .catch(err => {
      alert(err);
    });
  }

  const removeGoal = (id) => {
    setUserGoals(userGoals.filter((goal) => goal._id !== id));
  }

  //op:0 to set Goals, 1 to set display option (archived?Today?All?)
  function setPersonalGoal(op, newVal) {
    console.log("op: " + op + "; newVal", newVal);
    if (op === 0) {
      const existingName = userGoals.map(goal=>(goal["name"]));
      const diff = newVal.filter(item=>!existingName.includes(item["name"]));
      if(diff.length > 0)
      {
        for(var i =0; i<diff.length; i++){
          //axios.patch('http://localhost:5000/user/create-goal', {jwt_token:JSON.parse(localStorage.getItem("token")) , goal_name:diff[i].name,goal_description:diff[i].description}).catch((e)=>{console.log(e)});
          createGoal(diff[i].name,diff[i].description);//Is this correct???
        }
      }
      setUserGoals([...newVal]);
      
    }
    else
      setDisplayOption(newVal);
  }
  
  function currentDate(){
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10)
      month = "0"+month.toString();
    if (day < 10 && day.toString[0] !== "0")
      day = "0" + month.toString();
    const date = today.getFullYear() + '-' + month + '-' + day;
    return date;
  }

  const userGoalList = userGoals.map((goal) => {
    const goalBody = 
      <Goal
        key={goal._id}
        id={goal._id}
        name={goal.name}
        desc={goal.description}
        likes={goal.likes}
        liked={goal.liked}
        followed={goal.followed}
        removeGoal={removeGoal}
     />
    if(!displayOption[1] && !displayOption[0]) //Show all
    {
      if(goal.updatedAt===undefined)
        return goalBody;
      const date = currentDate();
      const today = new Date(date);
      const updateDate = new Date(goal.updatedAt.slice(0,10));
      const diff = (today.getTime() - updateDate.getTime())/(1000*3600*24);
      if (diff<=5)
       return (goalBody);
    }
    else if(displayOption[0])
    {
      if(typeof goal.updatedAt==='undefined')
        return goalBody;
       const date = currentDate();
       const today = new Date(date);
       const updateDate = new Date(goal.updatedAt.slice(0,10));
       const diff = (today.getTime() - updateDate.getTime())/(1000*3600*24);
       if(diff>5)
        return(goalBody);
    }
    else if(displayOption[1]) //Show only goals that are updated today
    {
        const date = currentDate();
        if(goal.updatedAt === undefined)
            return (goalBody);
        var updateDate = goal.updatedAt.slice(0,10);
        if(date===updateDate)
            return (goalBody);
   }
    
  });

  let returnContent = 
     <>
       <MyGoalOptionBar data={userGoals} onChange={setPersonalGoal} displayOption={displayOption}></MyGoalOptionBar>
       <div>
        {userGoalList}
       </div>
    </>;
  return (
    <>
      <Nav fetchSearchResults={fetchSearchResults} />
      
      {returnContent}
    </>
  );
}

export default MyGoals;
