import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Shortner from './components/Shortner'

function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/api/user`, { withCredentials: true })
  //     .then((res) => {
  //         setUser(res.data)
  //     })
  // })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Shortner/>} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   {user ? (<Shortner user={ user} />) : <Login />}
    // </div>
  )
}

export default App
