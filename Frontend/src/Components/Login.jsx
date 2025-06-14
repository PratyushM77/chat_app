import React,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleSuccess,handleError } from "../utils";
import { UserContext } from "./UserContext";
const Login = () => {
   const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
if(formData.email.length == "" || formData.password.length == ""){
 handleError("Name and Email should be atleast of 8 characters")
}
else{

  try {
    const response = await fetch("http://localhost:3000/login", {
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
      // localStorage.setItem("myUserId",result.)
    }
    if (response.ok) {
      console.log(result);
      handleSuccess(result.message);
      setformData({email:"",password:""})
      setUser(result.user); 
      navigate("/chat");
    }
  } catch (error) {
    console.error(error);
    handleError(error.message || "Something went wrong")
  }
};
}

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-300 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800 uppercase">
          Login To Your Account
        </h2>

        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-gray-500 bg-white px-2"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
              E-Mail Address:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a9 9 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
              autoFocus
                value={formData.email}
                onChange={handleChange}
                minLength='6'
                name="email"
                id="email"
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="E-Mail Address"
              />
            </div>
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
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 
                  4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
              minLength='8'
                  value={formData.password}
                  onChange={handleChange}
                name="password"
                id="password"
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex justify-end text-sm mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Your Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center transition duration-150"
          >
            <span className="mr-2 uppercase">Login</span>
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
            to="/register"
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
            You don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
