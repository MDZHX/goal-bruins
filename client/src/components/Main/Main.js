import React, { useState } from 'react';
import Goal from '../Goal/Goal';
import Nav from '../Nav/Nav';
import axios from 'axios';

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
    
    
    
    
      return(
          <>
              <Nav/>
              <div className="goals">
                  {goals.map((goal) => <Goal key={goal.id} name={goal.name} desc={goal.desc}/>)}
              </div>
          </>
      )
    
}

export default Main;