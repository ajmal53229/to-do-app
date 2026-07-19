import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Otp = ({auth_check ,  fetchTasks}) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const [OTPdata, setOTPdata] = useState({
    userotp: "",
    email: searchParams.get("email") || "",
  });

  const handleChange = (e) => {
    setOTPdata({
      ...OTPdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post("to-do-22lytwyjl-ajmal53229s-projects.vercel.app/varifyOTP", OTPdata)
    if(res.data === 'otp matched'){
      const isAuth = await auth_check()
      if(isAuth){
        await fetchTasks()
        navigate('/home')
      }
    }
    else{
      document.write(res.data)
    }
    } 
    catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      <div className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
            <h2 className="text-4xl font-bold text-center mb-2">
              Welcome
            </h2>

            <p className="text-zinc-400 text-center mb-8">
              Enter OTP code
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="userotp"
                placeholder="Enter OTP code"
                required
                value={OTPdata.userotp}
                onChange={handleChange}
                className="w-full px-6 py-5 bg-zinc-900 border border-white/10 rounded-2xl focus:border-violet-500 outline-none"
              />

              {/* Hidden Email */}
              <input
                type="hidden"
                name="email"
                value={OTPdata.email}
              />

              <button
                type="submit"
                className="w-full py-5 bg-white text-zinc-900 font-semibold rounded-2xl text-lg hover:bg-zinc-200 transition"
              >
                Verify OTP
              </button>
            </form>

            <div className="text-center mt-6">
              <Link
                to="/signup"
                className="text-zinc-400 hover:text-white"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;