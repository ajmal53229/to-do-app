const path = require('path')
const express = require('express')
const {addTask, deleted, getData, update, Signup ,Check_auth, login, verifyOtp, ResendOTP,} = require('../controler')
const auth = require('../middleware/auth');

const Router = express.Router()

// user signup
Router.post('/user' ,Signup)

// user signup
Router.post('/login' ,login)

// Resend OTP
Router.post('/ResendOTP', ResendOTP)

// Varify OTP
Router.post('/varifyOTP' , verifyOtp)

// Check auth
Router.get('/Check_auth',auth ,Check_auth)

// Add task
Router.post('/task',auth, addTask)

//Delete
Router.post('/delete' ,auth , deleted)

// updated
Router.post('/update' ,auth , update)

// Get Data
Router.get('/Data' ,auth , getData)


module.exports = Router