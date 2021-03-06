import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import "../Signup/Form.css";

function Login(){
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    axios
    .post(
      'http://localhost:5000/user/login', 
      data, 
      { headers: {"content-type": "application/json"} }
    )
    .then((res) => {
      let token_deserialized=JSON.stringify(res.data.data);
      if(res.status){
        localStorage.clear()
        localStorage.setItem('token',token_deserialized);
        localStorage.setItem('username',data.username);
        //console.log(localStorage.getItem('token'));
        window.location.href = "/discover";
      }
    })
    .catch(()=>{
      localStorage.clear();
      alert("Incorrect Password/Username!");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <h1>Login</h1>

      <span className="label">Username: </span>
      <input {...register("username", { required: true })} placeholder="Username"/>
      {errors.username && <span className="error-message">This field is required</span>}

      <span className="label">Password: </span>
      <input {...register("password", { required: true }) } placeholder="Password" type="password"/>
      {errors.password && <span className="error-message">This field is required</span>}
      
      <button className="login-button-in-login" type="submit">Login</button>

    </form>
  );
}

export default Login;
