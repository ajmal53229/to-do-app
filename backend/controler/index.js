require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Task = require('../models/taskModel');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false,
    
    auth:{
        user: process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

//sign up

const Signup = async(req,res)=>{
    const {name , email , password} = req.body
    const userExist =await user.find({email})
    if (userExist){
        return res.send('user already exist')
    }
    const hashedPassword = await bcrypt.hash(password , 10)
    let isvarified = false
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    await transporter.sendMail({
        from : 'ajmalbaltistani229@gmail.com',
        to : email,
        subject : 'OTP Varification',
        text: `your OTP is ${otp}`
    })
    try {
        const NewUser =await new user({
            name , email , otp , isvarified , password : hashedPassword
        })
        await NewUser.save()
        res.json('user saved')
    }
    catch (error) {
        res.json(error.message)
    }
}

// Varify OTP
const verifyOtp  = async(req,res)=>{
    console.log(req.body)
    const {email ,userotp} = req.body
    try {
        const userfound =await user.findOne({email})
        if(!userfound){
            return res.send('user not found')
        }
        if(userotp != userfound.otp){
            return res.send('otp not matched')
    }
        userfound.otp = ""
        userfound.isvarified = true
        await userfound.save()
        
        const token = jwt.sign(
            {
                id: userfound._id,
                email: userfound.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        res.json('otp matched')
    }
    catch (error) {
        res.send(error.message)
    }
}

// Login

const login = async(req,res)=>{
    console.log('login called')
const {email , password} = req.body
try {
     const userfound =await user.findOne({email})
        if(!userfound){
            return res.send('user not found')
        }
    const match = await bcrypt.compare(
        password,
        userfound.password
    )
    if(!match){
        return res.send('Incorrect Password')
    }

    const token = jwt.sign(
            {
                id: userfound._id,
                email: userfound.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
        console.log("TOKEN CREATED:", token);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        res.json('login success')
} 
catch (error) {
    res.send(error.message)
}
}


// Check auth
const Check_auth = async(req,res)=>{
    console.log(req.user)
    res.json({
        success: true,
        user: req.user
    })
}

//add task

const addTask = async(req,res)=>{
    const {title , completed} = req.body
    try {
        const newTask = new Task({
        id: req.user.id,
        title , completed
    })
    await newTask.save()
    res.json('Task saved')
    } 
    catch (error) {
        res.json(error.message)
    }
}
// delete task


const deleted = async(req,res)=>{
    const {_id} = req.body
    try {
        const deleteTask = await Task.findOneAndDelete({_id , id: req.user.id });
    if (!deleteTask) {
            return res.status(404).send("Product not found");
        }
    res.json('Task deleted')
    } 
    catch (error) {
        res.json(error.message)
    }
}

// update task

const update =  async(req,res)=>{
     const {_id} = req.body
    try {
        const updatedTask = await Task.findOne({ _id , id: req.user.id })
    if (!updatedTask) {
            return res.status(404).send("task not found");
        }
        updatedTask.completed = !updatedTask.completed
        await updatedTask.save()
    res.json('Task updated')
    } 
    catch (error) {
        res.json(error.message)
    }
}
// sent data from mongodb to frontend

const getData = async(req,res)=>{
    try {
        const taskFound =await Task.find({id:req.user.id})
    if(taskFound.length < 1){
        console.log(' No task found')
    }
    res.json(taskFound)
    } 
    catch (error) {
        res.json(error.message)
    }
}


module.exports = {Signup ,Check_auth, addTask , deleted , update , getData, login , verifyOtp}