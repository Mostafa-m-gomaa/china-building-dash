import React from 'react'
import './login.css'
import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../../App';

const Login = () => {
    const history =useNavigate()
    const {onload ,setOnload} =useContext(AppContext)
    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const {showError ,setShowError} =useContext(AppContext)
    const {login,setLogin}=useContext(AppContext)
    const handleMail =(e)=>{
        setMail(e.target.value)
    }
    const handlePass =(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setOnload(true)
        
    const formData = new FormData();
    formData.append('email', mail);
    formData.append('password', password);
  
    try {
      const response = await fetch('https://api.sdcbm.com/api/login', {
        method: 'POST',
        body: formData,
      })
      .then(res=>res.json())
      if (response.status==="Success") {
        sessionStorage.setItem("token",response.token)
        setOnload(false)
        setLogin(true)
        history("/orders")
      } else {
       setOnload(false)
       setShowError(true)
      }
    } catch (error) {
      console.log(error);
     
    }
  };

  return (
    <div className="login">
        <h1>Login To DashBoard</h1>

        <form action="" onSubmit={handleSubmit}>
            <input value={mail} onChange={handleMail} type="email" placeholder='Email' />
            <input value={password} onChange={handlePass} type="password" placeholder='Password' />
            <button type='submit' >Submit</button>
        </form>
    </div>
  )
}

export default Login
