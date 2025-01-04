import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Shortner from './components/Shortner'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from './config'

function App() {

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);  // State to hold user info


    useEffect(() => {
      const authCheck = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/home`, { withCredentials: true });
          if (response.data.authenticated) {
            setIsAuthenticated(true);
            setUser(response.data.user);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (e) {
          setIsAuthenticated(false);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      authCheck();

    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? (
      <>
        <h1>{user}</h1>
        {element}
      </>
    ) : (
      <Navigate to="/" replace />
    );
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
