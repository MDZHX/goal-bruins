import React,{useState} from 'react'
import './MyGoal.css'
import Button from '../Button/Button';


function OptionButton(props){
    return(
       <Button>
         <div className="option-button-container" onClick={props.onClick}>
            {props.text}
         </div>
       </Button>
    );
}

function MyGoal(props){
    const [property,propertySet]=useState(false);//is option button clicked?
    const [change,setChange]=useState(false);

    //>>>>>>>>>>>>>>>IF DATA STRUCTURE IS CHANGED, CHANGE THIS!<<<<<<<<<<<<<<<<<<<<<<
    const [changeContent,setChangeContent]=useState([props.name,props.description]);

    //alert(selection);
    if(!property)
    {
        return(
        <div className="mgc">
            <div className="goal-card-info">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            </div>
            <OptionButton onClick={()=>propertySet(true)} text="Options">
            </OptionButton>
        </div>
        )
    }
    else if(change)
    {
        function applyChange(){
            var tempData = [...props.data];
            for(var i=0; i<tempData.length; i++){
                if(props.data[i].id===props.id){
                    var copy={};
                    //>>>>>>>>CHANGE THIS IF U CHANGE DATA STRUCTURE!!<<<<<<<<<<<<
                    copy["id"]=props.id;
                    copy["name"]=changeContent[0];
                    copy["description"]=changeContent[1];
                    copy["archived"]=props.data[i].archived;
                    tempData[i]=copy;
                    props.onChange(0,tempData);
                    break;
                }
            }
        }
        return(
        <div className="mgc">
            <div className="goal-card-info">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            </div>
            <div className="change-input">
            <input defaultValue={props.name} onChange={(e)=>{setChangeContent([e.target.value,changeContent[1]])}}></input>
            <input defaultValue={props.description} onChange={(e)=>{setChangeContent([changeContent[0],e.target.value])}}></input>
            <OptionButton onClick={()=>{applyChange(); setChange(false);propertySet(false);}}text="Save">
            </OptionButton>
            </div>
        </div>
        );

    }
    else
    {
       function changeGoal(selection) {
           //delete this goal
           if(selection=="delete")
           {
            var tempData = [...props.data];
            var name="";
            for(var i=0; i<tempData.length; i++){
                if(props.data[i].id===props.id)
                {
                    name = props.data[i].name;
                    tempData.splice(i,1);
                    break;
                }
            }
            alert(`goal "${name}" deleted!`);
            props.onChange(0,tempData);
            return;
           }
           //archive this goal
           if(selection=="archive")
           {
            var tempData = [...props.data];
            for(var i=0; i<tempData.length; i++){
                if(props.data[i].id===props.id)
                {
                    var copy={};
                    //>>>>>>>>CHANGE THIS IF U CHANGE DATA STRUCTURE!!<<<<<<<<<<<<
                    copy["id"]=props.id;
                    copy["name"]=props.data[i].name;
                    copy["description"]=props.data[i].description;
                    copy["archived"]=!props.data[i].archived;
                    tempData[i]=copy;
                    props.onChange(0,tempData);
                    break;
                }
            }
           }
           
       }
       
       return(
        <div className="mgc">
            
            <div className="goal-card-info">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            </div>
            <div className="info-change-box">
                 <select className="option-drop-down-box" onChange={(e)=>{changeGoal(e.target.value);e.target.value="chage"?setChange(true):propertySet(false)}}>
                     <option value="default">...</option>
                     <option value="change">Change Goal</option>
                     <option value="archive" >Archive / Unarchive</option>
                     <option value="delete">Delete Goal</option>
                 </select>
            </div>
        </div>
       );
    }
  }
  

export default MyGoal
