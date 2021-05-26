import React, { useState,useEffect } from 'react';
import Goal from '../Goal/Goal';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Button from '../Button/Button'
import './Main.css'
import { use } from '../../../../server/routes/user';

const data = [
    {
      "id": 1,
      "name": "Learn React",
      "desc": "React is fun",
    },
    {
      "id": 2,
      "name": "Learn Node",
      "desc": "Node is fun",
    },
    {
      "id": 3,
      "name": "Learn Express",
      "desc": "Express is fun",
    },
    {
      "id": 4,
      "name": "Learn MongoDB",
      "desc": "MongoDB is fun",
    },
    {
      "id": 5,
      "name": "Learn HTML",
      "desc": "HTML is fun",
    },
    {
      "id": 6,
      "name": "Learn CSS",
      "desc": "CSS is fun",
    },
    {
      "id": 7,
      "name": "Learn HTTP",
      "desc": "HTTP is fun",
    },
    {
      "id": 8,
      "name": "Learn async",
      "desc": "Async is fun",
    },
    {
      "id": 9,
      "name": "Learn FP",
      "desc": "FP is fun",
    },
  ]



function Main(){
    const [goals, setGoals] = useState(data);
    const [itemRendered, setItemRendered] = useState(6);
    useEffect(async ()=>{
      //console.log("START!")
      const result = await axios
      .get('http://localhost:5000/goal/all-goals');
    
       setGoals(result.data);
       //console.log(result.data);
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
      function expandList()
      {
        setItemRendered(itemRendered+4);
      }   
      
      const goalList = goals.map((goal) => {if(goals.indexOf(goal)<itemRendered) return<Goal key={goal.id} name={goal.name} desc={goal.desc}/>});
      
      function AddGoalButton(){
          return(
            <div >
               <Button onClick = {expandList} className="expaonsion-button-container">
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

export default Main;