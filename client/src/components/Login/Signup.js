import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

export default function Signup(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();
      const onSubmit = (data) => {
        console.log(data);
      }; 
    
      console.log(watch("email")); // you can watch individual input by pass the name of the input
      console.log(watch("password"));

      return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <h1>Login</h1>
          
          <span>Name: </span>
          <input {...register("name", { required: true }) } placeholder="Your Name"/>
          {errors.name && <span className="error-message">This field is required</span>}

          <span>Email: </span>
          <input {...register("email", { required: true })} placeholder="Email Address"/>
          {errors.email && <span className="error-message">This field is required</span>}

          <span>Password: </span>
          <input {...register("password", { required: true }) } placeholder="Your Password"/>
          {errors.password && <span className="error-message">This field is required</span>}

          <input type="submit" className="button"/>
        </form>
      );
}