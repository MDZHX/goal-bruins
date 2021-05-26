import './MyGoalOptionBar.css'
//import Button from '../Button/Button';
import {useState} from 'react';
import axios from 'axios';


function Button(props) {
    return (
      <button className="button" onClick={props.onClick}>
        {props.children}
      </button>
    );
  }

function MyGoalOptionBar(props){
    const [add, setAdd] = useState(false);
    const [addContent, setAddContent]=useState(["","",""]);
   

    function sort(data,type){
        if(type==="fl")
        {
            var tempData=[...data];
            tempData.sort(function(a,b){
                if(a["name"][0].toLowerCase()<=b["name"][0].toLowerCase())
                    return -1;
                else
                    return 1;
            });
            props.onChange(0,tempData);
        }

        if(type==="newest")
        {
            var tempData = [...data];
            tempData.sort(function(a,b){
                if(a["createdAt"]<=b["createdAt"]){
                    return 1;
                }
                else
                    return -1;
            });
            props.onChange(0,tempData);
        }

    }

    function showArchived(){
        props.onChange(1,[1,0]);
    }

    function showAll(){
        props.onChange(1,[0,0]);
    }

    //>>>>>>>>>>>>>>>IF DATA STRUCTURE IS CHANGED, CHANGE THIS!<<<<<<<<<<<<<<<<<<<<<<
    function setNewGoal(){
        if(addContent[0]==="")
            return -1;
        var tempData=[...props.data];
        var tempId = 0;
        for(var i=0; i<tempData.length;i++){
            if(tempData[i].id>=tempId)
                tempId=tempData[i].id;
        }
        tempId+=1;
        var copy={};
        copy["id"]=tempId;
        copy["name"]=addContent[0];
        copy["description"]=addContent[1];
        copy["archived"]=false;
        tempData.push(copy);
        props.onChange(0,tempData);
        return 0;
    }

    function addOption(){
        if(!add)
            return(
                <div className="add-goal-div">
                <Button onClick={()=>{setAdd(true);}}>
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
                <>
                    <div className="add-goal-div">
                        
                        <input className="input" placeholder="Name" onChange={(e)=>{setAddContent([e.target.value,addContent[1],addContent[2]])}}></input>
                        <input className="input" placeholder="Description" onChange={(e)=>{setAddContent([addContent[0],e.target.value,addContent[2]])}}></input>
                        <input className="input" placeholder="Date" onChange={(e)=>{setAddContent([addContent[0],addContent[1],e.target.value]);}}></input>
                        <Button>
                            <span className="save-button" onClick={()=>{var i=setNewGoal();i===-1? alert("Name Cannot be Empty"):setAdd(false);}}>
                                Save
                            </span>
                        </Button>
                        <Button>
                            <span className="save-button" onClick={()=>{setAdd(false);}}>
                                Cancel
                            </span>
                        </Button>
                    </div>
               </>
            );
        }
    }

    return(
    <>
      <div className="my-goal-option-bar">
          <div>
            {/* <button onClick={getGoal}>
                dummy
            </button> */}
              <Button onClick={showAll}>All</Button>
              <Button>Today</Button>
              <Button onClick={showArchived}>Archived</Button>
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
