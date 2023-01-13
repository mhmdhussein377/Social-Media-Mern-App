import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'


function App() {

  const {user} = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Register />} />
        <Route path='login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='register' element={user ? <Navigate to="/" /> : <Register />} />
        <Route path='profile/:username' element={<Profile />} />
      </Routes> 
    </div>
  )
}

export default App
