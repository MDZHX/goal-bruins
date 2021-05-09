import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg'
import like from './logo192.png'
import background from './campus.png'
import Tags from './tags.js'

//mostly static components of the page; task lists
function Contianer({title,li}){
  return(
    <>
        <div>
             <h1 className="Header">
               <img src={logo} className="logo"></img>
               <h2 className="bigTit">GOAL BRUINS</h2>
              </h1>
        </div>
        <div className="cont">
            <h5 className="title">
              {title}
            </h5>
            {li}
         </div>
         <div className="cont2">
            <h5 className="title">
              TRENDING
            </h5>
         </div>
    </>
  );
}

function Task(props) {
    return(
      <div className="task" onClick={props.onClick}>
           <p className="taskItem">Name:{props.name} </p>
           <p className="taskItem2"> Date:{props.date} </p>      
       </div>
      );
}

class Tasks extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      numoft:0,
      tasks: [],
      dates:[],
      temp: "",
      tempDate:"",
    };
  }

  //Add Plan button
  Click(){
    if(this.state.tasks.length>=6)
     return;
     var t = this.state.temp;
     if(this.state.tasks.filter(x=>x===t).length>0)
     {
       alert("EVENT ALREADY EXISTS!");
       return;
     }
     if(t==="" || t==="EVENTS")
     {
       alert("INVALID EVENT INPUTS!");
       return;
     }
     var t2 = this.state.tempDate;
     if(t2==="" || t2==="DATES")
     {
        alert("INVALID DATE INPUT!!");
        return;
     }
     
     this.setState(
       {
         tasks:this.state.tasks.concat(this.state.temp),
         dates:this.state.dates.concat(this.state.tempDate),
       }
     );
  }
  
  //get name of event
  getData(event){
    //console.log(event.target.value);
    this.setState({
      temp:event.target.value,
    });
  }

  //get date of event
  getData2(event){
    //console.log(event.target.value);
    
    this.setState({
      tempDate:event.target.value,
    });
  }

  //delete a particular task
  deleteTask(event){
    //console.log(event.target.id);
    const temp = this.state.tasks;
    temp.splice(event.target.id,1);
    const temp2= this.state.dates;
    temp2.splice(event.target.id,1);
    this.setState(
      {
        tasks:temp,
        dates:temp2,
      }
    )
    //console.log("AFTER",this.state.tasks);
  }

  render(){
    //console.log("STATE TASK IN RENDER:", this.state.tasks);
    this.Click = this.Click.bind(this);
    this.getData=this.getData.bind(this);
    this.deleteTask=this.deleteTask.bind(this);
    this.getData2=this.getData2.bind(this);
    const tlist = this.state.tasks;
    //console.log("TLIST:",tlist);
    const li = tlist.map((str)=>{
      
     // console.log("INSPECTING",{str});
      var found = 0;
      for (let index = 0; index < tlist.length; index++) {
        var element = tlist[index];
        if(element==str)
        {
          found=index;
          break;
        }
      }
    return(
    <ol>
      <button id={found} onClick={this.deleteTask}>DELETE</button>
      <Task id={str} name={str} date={this.state.dates[found]}key={str}></Task>
    </ol>);
    }
    );
    //console.log(li);
    

    return(
    <>
       <img src={background} className="background"></img>
       <Contianer title="PLANNER" li ={li}></Contianer>
       <button onClick={this.Click} className="add">ADD PLAN</button>
       <input type="text" defaultValue="EVENTS" className="input" onChange={this.getData}></input>
       <input type="text" defaultValue="DATE" className="input2" onChange={this.getData2}></input>
       <div className="input3">
           <input type="text" defaultValue="Search Anything..."  onChange={this.getData3}></input>
           <button>Search!</button>
       </div>
       <img src={like} className="link" onClick={(e)=>{
         e.preventDefault();
         window.location.href='http://google.com';
      }}></img>
    </>
    );
  }
}

ReactDOM.render(
  <Tasks></Tasks>,
  document.getElementById('root')
);

