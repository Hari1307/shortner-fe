import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'

const Login = () => {
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(['userSession'])

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/auth/google`)
      if (response.data.success) {
        setCookie('userSession', response.data.user, {
          path: '/',
          httpOnly: true
        })
          console.log(cookie)
        navigate('/home')
      } else {
        console.error('Login failed:', response.data.error)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }
  return (
    <div className='flex w-screen h-screen justify-around items-center bg-slate-300'>
      <button
        className='bg-slate-400 p-5 rounded-lg hover:bg-slate-500 transition-all ease-in-out duration-500'
        onClick={handleGoogleLogin}
      >
        Google Login
      </button>
    </div>
  )
}

export default Login
