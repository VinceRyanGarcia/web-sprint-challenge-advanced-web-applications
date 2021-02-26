import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';

const initForm = {
  username: "Lambda School",
  password: "i<3Lambd4"
};

const initError = {
  error: "" 
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(initError);

  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login",form)
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/bubble')
      })
      .catch((err) => {
        setError({error:"Username or Password not valid."});
      })
  }



  useEffect(()=>{
    axios
      .delete(`http://localhost:5000/api/colors/1`, {
        headers:{
          'authorization': "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98"
        }
      })
      .then(res=>{
        axios.get(`http://localhost:5000/api/colors`, {
          headers:{
            'authorization': ""
          }
        })
        .then(res=> {
          console.log(res);
        });
        console.log(res);
      })
  });

  return (
    <>
      <h1>
        Welcome to the Bubble App!
       <form onSubmit={login}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
         
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <p style={{ color: `red`, fontSize: "12px" }}>{error.error}</p>
          <button>Log in</button>
        </form>
      </h1>
    </>
  );
};

export default Login;

//Task List:
//1. [x] Build a form containing a username and password field.
//2. [x] Add whatever state nessiary for form functioning.
//3. [x] MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. [x] If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. [x] If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.