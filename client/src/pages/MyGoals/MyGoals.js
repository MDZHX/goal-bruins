import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Nav from '../../components/Nav/Nav';
import Goal from '../../components/Goal/Goal'
import CreateGoal from '../../components/CreateGoal/CreateGoal';
import MyGoalOptionBar from '../../components/MyGoal/MyGoalOptionBar.js'
import MyGoal from '../../components/MyGoal/MyGoal'
import { Link } from 'react-router-dom'
import './MyGoals.css'

//import { jwt_userId } from '../../../../server/routes/jwt';
// function MyGoals() {

//   const [userGoals, setUserGoals]=useState([]);
//   useEffect(()=>{
//     async function fetchUserGoals() {
//       const result = await axios
//       .get('http://localhost:5000/goal/all-goals');

//       console.log("sample", result.data[0]);
//       // TODO: error handling
//       setUserGoals(result.data);
//     }
//     fetchUserGoals();
//   },[]);

//   const userGoalList = userGoals.map(goal =>
//     <MyGoals
//       key={goal._id}
//       id={goal._id}
//       name={goal.name}
//       desc={goal.description}
//     />
//   );

// const createGoal = (goal, setName, setDescription) => {
//   axios
//   .post('http://localhost:5000/goal/add-goal', goal)
//   .then(res => {
//     // TODO: error handling
//     setUserGoals([res.data].concat(userGoals));
//     setName("");
//     setDescription("");
//   });
// }


  function MyGoals() {

    const [userGoals, setUserGoals]=useState([]);
    const [token, setToken]=useState("");
    const [displayOption,setDisplayOption]=useState([false,false]);//first option: archieved, second: today

    
    useEffect(async ()=>{
       setToken(localStorage.getItem("token"));
      const result = await
       axios
       .patch('http://localhost:5000/user/show-followed',{jwt_token:JSON.parse(localStorage.getItem("token")) }
      ).catch((e)=>console.log(e));
        if(result!=undefined)      
         setUserGoals(result.data);
      },[]);

    //op:0 to set Goals, 1 to set display option (archived?Today?All?)
    function setPersonalGoal(op,newVal){ 
      if(op===0){
        const diff = newVal.filter(item=>!userGoals.includes(item));
        if(diff.length >0)
        {
          for(var i =0; i<diff.length; i++){
            axios.patch('http://localhost:5000/user/create-goal', {jwt_token:JSON.parse(localStorage.getItem("token")) , goal_name:diff[i].name,goal_description:diff[i].description}).catch((e)=>{console.log(e)});
          }
        }
        setUserGoals(newVal);
      }
      else
        setDisplayOption(newVal);
    }
    
    const userGoalList = userGoals.map((goal)=>{
      const goalBody = 
          <MyGoal 
              id={goal.id}
              name={goal.name} 
              description={goal.description} 
              onChange={setPersonalGoal}
              data = {userGoals}>
          </MyGoal>;
      if(!displayOption[1]) //Show all
       return (goalBody);
      else //Show only goals that are updated today
      {
          var today = new Date();
          var month = today.getMonth()+1;
          var day = today.getDate();
          if(month<10)
            month = "0"+month.toString();
          if(day <10 && day.toString[0]!="0")
            day = "0" + month.toString();
          var date = today.getFullYear()+'-'+month+'-'+day;
          if(goal.updatedAt==undefined)
              return (goalBody);
          var updateDate = goal.updatedAt.slice(0,10);
          if(date===updateDate)
              return (goalBody);
       }
     
    });

    let returnContent = 
       <>
         <MyGoalOptionBar data={userGoals} onChange={setPersonalGoal}></MyGoalOptionBar>
         <div>
         {userGoalList}
         </div>
      </>;
    if(token==="\"\"")
    {
      returnContent = 
      <div className="not-signed-in">
          <h1>You are not signed in. Please</h1>
          <Link to="/login">
            <h1>log in</h1>
          </Link>
          <h1>or </h1>
          <Link to="/signup">
          <h1> Sign up</h1>
          </Link>
      </div>;
    }
    return (
    <>
      <Nav></Nav>
      {returnContent}
    </>
    );
  // return (
  //   <>
  //     <Nav />
  //     {/* TODO: Modify the option bar */}
  //     { <MyGoalOptionBar data={userGoalList} onChange={setPersonalGoal} />}
  //     <CreateGoal createGoal={createGoal} />
  //     <div>
  //       {userGoalList}
  //     </div>
  //   </>
  // );
};

export default MyGoals;
