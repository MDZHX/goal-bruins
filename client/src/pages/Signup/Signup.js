import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import {Link} from 'react-router-dom'
import "./Signup.css";

function Signup(){
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    // { username: data.username, password: bcrypt.hash(data.password, 10) }
    // const hashedPassword= await bcrypt.hash(data.password, 10);
    // console.log(hashedPassword);
    // console.log(hash);

    axios
    .post("http://localhost:5000/user/new-user", data)
    .then(() => {
      alert("Signup Successful! Redirecting to Login Page")
    })
    .catch(() => {
      alert("Username Already Exists!")
    })
    .then(()=>{
      window.location.href = "/login";
    });
  }; 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <h1>Signup</h1>

      <span>Name: </span>
      <input {...register("username", { required: true }) } placeholder="Your Name"/>
      {errors.username && <span className="error-message">This field is required</span>}

      <span>Password: </span>
      <input {...register("password", { required: true }) } placeholder="Password" type="password"/>
      {errors.password && <span className="error-message">This field is required</span>}

      {/* <input type="submit" className="button" /> */}
      <button className="button">Register</button>
      <Link to="/login">
        <button className="button">Login</button>
      </Link>
    </form>
  );
}

export default Signup;
