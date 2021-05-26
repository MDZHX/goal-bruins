import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import {Link} from 'react-router-dom'
import axios from 'axios';

//const jwt = require('jsonwebtoken')

export default function Login(){
  const [userLogedIn, setUserLogedIn]=useState(false)

    function UserLoginedIn(){
      const config={
        header:{
          Authorization:'Bearer'+ localStorage.getItem('token')
        }
      }
      axios.get('http://localhost:5000/', config)
      .then(
          setUserLogedIn({
            userLogedIn:true
          })
      );
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();
      const onSubmit = (data) => {
        data.preventDefault();
        console.log(data);
        axios
        .post(
          'http://localhost:5000/user/login', 
          data, 
          {headers:{"content-type": "application/json"}}
        ).then((res)=>localStorage.setItem('token',res.data.token));
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