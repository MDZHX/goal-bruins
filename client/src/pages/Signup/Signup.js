import React from "react";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
import axios from 'axios';
import "./Form.css";

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
      alert("Signup Successful! Redirecting to Login Page");
      window.location.href = "/login";
    })
    .catch(() => {
      alert("Username Already Exists!")
    });
  }; 

  return (
    <body>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <h1>Signup</h1>

        <span className="label">Name: </span>
        <input {...register("username", { required: true }) } placeholder="Your Name"/>
        {errors.username && <span className="error-message">This field is required</span>}

        <span className="label">Password: </span>
        <input {...register("password", { required: true }) } placeholder="Password" type="password"/>
        {errors.password && <span className="error-message">This field is required</span>}

        {/* <input type="submit" className="button" /> */}
        <div className="buttons">
          <button className="login-button">Register</button>
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </form>
    </body>
  );
}

export default Signup;
