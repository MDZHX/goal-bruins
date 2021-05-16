import React, { Component } from 'react'
import './tags.css'

function tagBlock() {
    return (
        <div className="block">
            <h1>Block</h1>
        </div>
    )
}


export class Tags extends Component {
    constructor(props){
        super(props);
        this.state={
            tags:[],

        }
    }

    addTag(){
        console.log("edwewaeae");
        this.setState({
            tags:this.state.tags.concat(["111"]),
        })
    }
    render() {
        this.addTag=this.addTag.bind(this);
        console.log(this.state.tags);
        const taglist = this.state.tags;
        const li = taglist.map((str)=>{
            console.log(str);
            return(<li className="tagBlock">
                {str}
            </li>);
            
        });
        console.log(li);
        return (             
            <div>
                <h1>323</h1>
                <button onClick={this.addTag}>AddTag</button>
                <div>
                    <ul>{li}</ul>
                   
                </div>
               
            </div>
        )
    }
}

export default Tags
