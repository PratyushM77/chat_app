import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.length == "" ||
      formData.email.length == "" ||
      formData.password.length == ""
    ) {
      handleError("All fields are required!!");
    }
    else{

      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.log(result.message);
        handleError(result.message || "Login failed");
      }
      if (response.ok) {
        console.log(result);
        handleSuccess(result.message);
        setFormData({ email: "", password: "", name: "" });
        
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      handleError(result.message || "Something went wrong");
    }
  }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-300 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800 uppercase">
          Create an Account
        </h2>

        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-gray-500 bg-white px-2"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-sm text-gray-600">
              Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"></span>
              <input
                autoFocus
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                type="name"
                className="w-full pl-2 pr-4 py-2 border border-gray-400 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
              E-Mail Address:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"></span>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                type="email"
                className="w-full pl-2 pr-4 py-2 border border-gray-400 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="E-Mail Address"
              />
            </div>
          </div>
          <div className="mb-4">
            
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-600"
            >
              Password:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {/* <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 
                  4 0 00-8 0v4h8z" />
                </svg> */}
              </span>
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                className="w-full pl-2 pr-4 py-2 border border-gray-400 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>

          <br />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center transition duration-150"
          >
            <span className="mr-2 uppercase">Register</span>
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            to="/login"
            className="flex justify-center items-center text-blue-500 hover:underline"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
