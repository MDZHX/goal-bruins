import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import "./Login.css";

function Login(){
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
    .post(
      'http://localhost:5000/user/login', 
      data, 
      { headers: {"content-type": "application/json"} }
    )
    .then((res)=>{
        let token_deserialized=JSON.stringify(res.data.data);
        // let status_deserialized=JSON.stringify(res.data.status);
        // TODO: handle errors
        console.log(token_deserialized);
        localStorage.setItem('token',token_deserialized)
        console.log(localStorage.getItem('token'));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <h1>Login</h1>

      <span>Username: </span>
      <input {...register("username", { required: true })} placeholder="Username"/>
      {errors.username && <span className="error-message">This field is required</span>}

      <span>Password: </span>
      <input {...register("password", { required: true }) } placeholder="Password" type="password"/>
      {errors.password && <span className="error-message">This field is required</span>}

      <input type="submit" className="button"/>

    </form>
  );
}

export default Login;
