import './MyGoalOptionBar.css'
//import Button from '../Button/Button';
import React, { useState } from 'react';

function Button(props) {
  return (
    <button style={{backgroundColor:props.style}} className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function MyGoalOptionBar(props) {
  const [add, setAdd] = useState(false);
  const [addContent, setAddContent]=useState(["","",""]);
  //f(props.data.length>0)
      //console.log("data",props.data[0].props["name"][0]);

  function sort(data, type) {
    let tempData;
    if (type === "fl")
    {
      tempData = [...data];
      tempData.sort(function(a,b) { 
        if(a["name"][0].toLowerCase() <= b["name"][0].toLowerCase())
          return -1;
        else
          return 1;
      });
      props.onChange(0, tempData);
    }

    if(type === "newest")
    {
      tempData = [...data];
      tempData.sort(function(a,b) {
        if(a["createdAt"]<=b["createdAt"]){
          return 1;
        }
        else
          return -1;
      });
      props.onChange(0, tempData);
    }
  }

  function showArchived() {
    if(props.data.length==0){
      alert("Nothing created within 10 days/loaded!");
      return;
    }
    props.onChange(1,[1, 0]);
  }

  function showAll() {
    props.onChange(1,[0, 0]);
  }

  function showToday() {
    if(props.data.length==0){
      alert("Nothing created today/loaded!");
      return;
    }
    props.onChange(1,[0, 1]);
  }

  //>>>>>>>>>>>>>>>IF DATA STRUCTURE IS CHANGED, CHANGE THIS!<<<<<<<<<<<<<<<<<<<<<<
  function setNewGoal(){
    if (addContent[0] ==="" || addContent[1] === "")
      return -1;

    let tempData=[...props.data];
    const nameList = tempData.map(goal => goal["name"]);

    if (nameList.includes(addContent[0]))
      return -1;

    let tempId = 0;
    for (let i = 0; i < tempData.length; i++){
      if(tempData[i].id >= tempId)
        tempId=tempData[i].id;
    }

    tempId += 1;

    let copy = {};
    copy["id"] = tempId;
    copy["name"] = addContent[0];
    copy["description"] = addContent[1];
    copy["archived"] = false;
    tempData.push(copy);
    props.onChange(0,tempData);
    return 0;
  }

  function addOption(){
    if (!add)
      return(
        <div className="add-goal-div">
          <Button onClick={()=>{!props.displayOption[0]&&!props.displayOption[1]? setAdd(true):setAdd(false)}}>
              <div className="add-goal-container">
                    <span className="add-goal-text">Add Goals</span>
              </div>
          </Button>
        </div>
      );
    else
    {
      //>>>>>>>>>>>>>>>IF DATA STRUCTURE IS CHANGED, CHANGE THIS!<<<<<<<<<<<<<<<<<<<<<<
      return(
        <div className="add-goal-div">
          <input className="input" placeholder="Name" onChange={(e)=>{setAddContent([e.target.value,addContent[1],addContent[2]])}}></input>
          <input className="input" placeholder="Description" onChange={(e)=>{setAddContent([addContent[0],e.target.value,addContent[2]])}}></input>
          <Button>
            <span className="save-button" onClick={()=>{var i=setNewGoal();i===-1? alert("Invalid/repeated name/description"):setAdd(false); }}>
                Save
            </span>
          </Button>
          <Button>
            <span className="save-button" onClick={()=>{setAdd(false);}}>
                Cancel
            </span>
          </Button>
        </div>
      );
    }
  }

  let name;
  if(!props.displayOption[0]&&!props.displayOption[1])
    name = "ALL";
  else if(props.displayOption[0])
    name = "created in 10 days";
  else
    name = "Created Today";
//          
  return (
    <>
      <div className="my-goal-option-bar">
        <div>
          <Button onClick={showAll}>All</Button>
          <Button onClick={showToday}>Created Today</Button>
          <Button onClick={showArchived}>Within 10 Days</Button>
          <Button><h8 className="now-showing">{name}</h8></Button>
        </div>
        <div>
          <select className="sorting-options" onChange={(e)=>{sort(props.data,e.target.value)}}>
            <option value="default">Sort by...</option>
            <option value="fl">First Letter</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      {addOption()};
    </>
  );
}

export default MyGoalOptionBar
