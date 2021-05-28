import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Nav from '../../components/Nav/Nav';
import Goal from '../../components/Goal/Goal'
import CreateGoal from '../../components/CreateGoal/CreateGoal';
// import MyGoalOptionBar from '../../components/MyGoal/MyGoalOptionBar.js'
// import MyGoal from '../../components/MyGoal/MyGoal'
import './MyGoals.css'


function MyGoals() {
  const [userGoals, setUserGoals] = useState([]);
  // const [displayOption,setDisplayOption] = useState([false,false]);//first option: archieved, second: today
  
  useEffect(() => {
    async function fetchFollowedGoals() {
      const result = await axios
      .patch('http://localhost:5000/user/show-followed', { jwt_token: JSON.parse(localStorage.getItem("token")) })
      .catch((e) => console.log(e));

      console.log("Fetched followed goals", result);
      if (result)      
        setUserGoals(result.data);
    }
    fetchFollowedGoals();
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
      // TODO: error handling
      console.log(res);
      // setUserGoals([res.data].concat(userGoals));
      // setName("");
      // setDescription("");
    })
    .catch(err => {
      alert(err);
    });
  }

  const removeGoal = (id) => {
    setUserGoals(userGoals.filter((goal) => goal._id !== id));
  }

  const userGoalList = userGoals.map(goal =>
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
  );

  //op:0 to set Goals, 1 to set display option (archived?Today?All?)
  // function setPersonalGoal(op,newVal){ 
  //   if(op===0){
  //     const diff = newVal.filter(item=>!userGoals.includes(item));
  //     if(diff.length >0)
  //     {
  //       for(var i =0; i<diff.length; i++){
  //         axios.patch('http://localhost:5000/user/create-goal', {jwt_token:JSON.parse(localStorage.getItem("token")) , goal_name:diff[i].name,goal_description:diff[i].description}).catch((e)=>{console.log(e)});
  //       }
  //     }
  //     setUserGoals(newVal);
  //   }
  //   else
  //     setDisplayOption(newVal);
  // }
  
  // const userGoalList = userGoals.map((goal)=>{
  //   const goalBody = 
  //       <MyGoal 
  //           id={goal.id}
  //           name={goal.name} 
  //           description={goal.description} 
  //           onChange={setPersonalGoal}
  //           data = {userGoals}>
  //       </MyGoal>;
  //   if(!displayOption[1]) //Show all
  //    return (goalBody);
  //   else //Show only goals that are updated today
  //   {
  //       var today = new Date();
  //       var month = today.getMonth()+1;
  //       var day = today.getDate();
  //       if(month<10)
  //         month = "0"+month.toString();
  //       if(day <10 && day.toString[0]!="0")
  //         day = "0" + month.toString();
  //       var date = today.getFullYear()+'-'+month+'-'+day;
  //       if(goal.updatedAt==undefined)
  //           return (goalBody);
  //       var updateDate = goal.updatedAt.slice(0,10);
  //       if(date===updateDate)
  //           return (goalBody);
  //    }
    
  // });

  // let returnContent = 
  //    <>
  //      <MyGoalOptionBar data={userGoals} onChange={setPersonalGoal}></MyGoalOptionBar>
  //      <div>
  //      {userGoalList}
  //      </div>
  //   </>;

  return (
    <>
      <Nav />
      {/* TODO: Modify the option bar */}
      {/* <MyGoalOptionBar data={userGoalList} onChange={setPersonalGoal} /> */}
      <CreateGoal createGoal={createGoal} />
      <div>
        {userGoalList}
      </div>
    </>
  );
}

export default MyGoals;
