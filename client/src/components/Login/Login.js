import React , {useState} from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import {Link} from 'react-router-dom'
import axios from 'axios';

//const jwt = require('jsonwebtoken')


export default function Login(){
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();
    
      
      const onSubmit = (data) => {
            
        console.log(data);
        axios
        .post(
          'http://localhost:5000/user/login', 
          data, 
          {headers:{"content-type": "application/json"}}
        )
        .then((res)=>{
            
            let token_deserialized=JSON.parse(res.data.data);
            //let status_deserialized=JSON.stringify(res.data.status);
            if(res.status===200){
              localStorage.setItem('token',token_deserialized);
            }
            
        });
      }; 

      // console.log(watch("email")); // you can watch individual input by pass the name of the input
      // console.log(watch("password"));
      return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <h1>Login</h1>
          
          <span>Username: </span>
          <input {...register("username", { required: true })} placeholder="Username"/>
          {errors.username && <span className="error-message">This field is required</span>}

          <span>Password: </span>
          <input {...register("password", { required: true }) } placeholder="Password" type="password"/>
          {errors.password && <span className="error-message">This field is required</span>}

          {/* <Link to="/">
            <input type="submit" className="button"/>
          </Link> */}
          <input type="submit" className="button"/>
          
        </form>
      );
}