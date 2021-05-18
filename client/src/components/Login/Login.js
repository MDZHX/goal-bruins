import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

export default function Login(){
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
          {/* register your input into the hook by invoking the "register" function */}
          <input {...register("email", { required: true })} />
          {errors.email && <span className="error-message">This field is required</span>}

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("password", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.password && <span className="error-message">This field is required</span>}
    
          <input type="submit" className="button"/>
        </form>
      );
}