import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Shortner from './components/Shortner'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from './config'

function App() {

  const ProtectedRoute = ({ element }: {element:JSX.Element}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const authCheck = async () => {
        try {
          await axios.get(`${BACKEND_URL}/api/home`, { withCredentials: true });
          
          setIsAuthenticated(true);
        } catch (e) {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      authCheck();

    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={
          <ProtectedRoute element={<Shortner />} />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
