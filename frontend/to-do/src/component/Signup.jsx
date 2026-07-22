import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import { FaUser , FaBolt, FaEnvelope, FaLock, FaPaperPlane } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate()
    const [data , setdata] = useState({
     name: "",
    email: "",
    password: "",
    })
     const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://to-do-app-production-a39a.up.railway.app/user" , data)
      console.log(res.data)
    if(res.data === 'user saved'){
      navigate(`/otp?email=${data.email}`);
    }
    else{
      console.log(res.data)
    }
    } 
    catch (error) {
      console.log("Signup Error:", error.response?.data || error.message);
    }
  };



  return (
    <div className="text-white min-h-screen font-sans">

      {/* Signup Form */}
      <div className="min-h-screen flex items-center justify-center px-6">

        <div className="max-w-md w-full">

          <div className="glass border border-white/10 rounded-3xl py-3 px-10">

            <h2 className="heading">
              Create <span>Account</span>
            </h2>

            <p className="text-zinc-400 text-center mt-2">
              Welcome! Create your account.
            </p>

            <form className="mt-4 space-y-4">



                <div className="relative">
                
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  className="pl-14 w-full px-6 py-4 bg-zinc-900 border border-white/10 rounded-2xl"
                />

              </div>

              

              <div className="relative">
                
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                

                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  className="pl-14 w-full px-6 py-4 bg-zinc-900 border border-white/10 rounded-2xl"
                />

              </div>

              <div className="relative">

                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="pl-14 w-full px-6 py-4 bg-zinc-900 border border-white/10 rounded-2xl"
                />

              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="gradient-btn w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                Sign up
              </button>

            </form>
            <p className="ml-26">
                <span className="text-xs">Already have account ? </span>
                <Link to="/login"
              className="text-gray-300 hover:text-white transition-all duration-300"
            >
              Login
            </Link></p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;