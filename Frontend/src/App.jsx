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
function App() {
  const [user, setUser] = useState(null)

  return (
    <>
     <UserContext.Provider value={{ user, setUser }}>
      <Navbar/>
    
    <Routes>
       <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path = "/chat" element={<Chat/>}/>
      </Routes>
      <ToastContainer/> 
       </UserContext.Provider>
      </>
  )
}

export default App
