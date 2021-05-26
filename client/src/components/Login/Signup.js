import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from 'axios';
import {Link} from 'react-router-dom'



export default function Signup(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

      const onSubmit = (data) => {
        //{username:data.username, password:bcrypt.hash(data.password, 10)}
        // const hashedPassword= await bcrypt.hash(data.password, 10);
        // console.log(hashedPassword);
        //console.log(hash);
        
        axios
        .post("http://localhost:5000/user/new-user", data)
        .then(()=>{
          alert("Signup Successful! Please click login")
        })
        .catch((err)=>{
          console.log(err);
          if (err.code===500){
            alert("Username already exist!");
          }
        });
      }; 
    
      //console.log(watch("email")); // you can watch individual input by pass the name of the input
      //console.log(watch("password"));

      return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <h1>Signup</h1>
          
          <span>Name: </span>
          <input {...register("username", { required: true }) } placeholder="Your Name"/>
          {errors.username && <span className="error-message">This field is required</span>}

          {/* <span>Email: </span>
          <input {...register("email", { required: true })} placeholder="Email Address"/>
          {errors.email && <span className="error-message">This field is required</span>} */}

          <span>Password: </span>
          <input {...register("password", { required: true }) } placeholder="Password" type="password"/>
          {errors.password && <span className="error-message">This field is required</span>}
          {/* <Link to="/login">
            <input type="submit" className="button"/>
          </Link> */}
          <input type="submit" className="button"/>
          
        
          
        </form>
      );
}