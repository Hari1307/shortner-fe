import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Shortner from './components/Shortner'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Shortner />} />
      </Routes>
    </Router>
  )
}

export default App
