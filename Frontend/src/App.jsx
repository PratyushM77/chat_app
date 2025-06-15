import {ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
// import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import './App.css'
import Navbar from './Navbar'
import Chat from './Components/Chat'
import { UserContext } from './Components/UserContext'
import ProtectedRouteForAuth from './Components/ProtectedRouteforAuth'
function App() {
  const [user, setUser] = useState(null)

  return (
    <>
     <UserContext.Provider value={{ user, setUser }}>
      <Navbar/>
    
    <Routes>
       <Route path="/" element={<ProtectedRouteForAuth><Login /></ProtectedRouteForAuth>} />
       
          <Route path="/login" element={<ProtectedRouteForAuth><Login /></ProtectedRouteForAuth>} />
          <Route path="/register" element={<ProtectedRouteForAuth><Register /></ProtectedRouteForAuth>} />
          <Route path = "/chat" element={<Chat/>}/>
      </Routes>
      <ToastContainer/> 
       </UserContext.Provider>
      </>
  )
}

export default App
