import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Shortner from './components/Shortner'
import { BACKEND_URL } from './config'

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const validUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/login/success`, { withCredentials: true })
        if (response.status === 200) {
          setUser(response.data.user);
          return response.data.json();
        } else {
          throw new Error("Authentication failed");
        }
      } catch (e) {
        console.error(e);
      }
    }
    validUser();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={user ? <Shortner/> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
