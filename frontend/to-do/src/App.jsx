import React from 'react'
import axios from "axios";
import { useState , useEffect} from 'react';
import { Routes , Route, Navigate, useNavigate} from "react-router-dom";
import TodoApp from './component/TodoApp'
import Signup from './component/Signup';
import Otp from './component/Otp';
import Login from './component/login';
import "./component/loder.css"


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [check , setCheck] = useState(false)
  const [loading , setLoading] = useState(true)
  const navigate = useNavigate()

  const auth_check = async () =>{
      try {
      const res =await axios.get("http://localhost:7000/Check_auth", {
            withCredentials: true,
        })
        console.log("LOGIN RESPONSE:", res.data)
          setCheck(res.data.success)
          return res.data.success
    } 
    catch (error) {
          setCheck(false)
          return false
      
    }
    finally{
      setLoading(false)
    }
    }

    const fetchTasks =async ()=>{
      try {
  const res = await axios.get("http://localhost:7000/Data",
    {
    withCredentials: true
  }
  )
  setTasks(Array.isArray(res.data) ? res.data : [])
      } 
      catch (error) {
        console.log('error : ',error.message)
      }
} 

    useEffect(()=>{
      const checkUser = async () =>{
        const isAuth = await auth_check()
        if(isAuth){
          fetchTasks()
        }
      }
      checkUser()
},[])

  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login auth_check = {auth_check} fetchTasks = {fetchTasks}/>}/>
      <Route path="/otp" element={<Otp auth_check = {auth_check} fetchTasks = {fetchTasks}/>} />
      <Route path="/home" element = {loading ? (

<div className="loader">
  <div className="wrapper">
    <div className="circle"></div>
    <div className="line-1"></div>
    <div className="line-2"></div>
    <div className="line-3"></div>
    <div className="line-4"></div>
  </div>
</div>

      ):check ?<TodoApp tasks = {tasks} fetchTasks = {fetchTasks}/>:
    <Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App