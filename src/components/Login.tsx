import { BACKEND_URL } from "../config";


const Login = () => {
    // const navigate = useNavigate();
//     const handleLogin = () => {
//     // Simulate login and set a flag or token to indicate the user is logged in
//     localStorage.setItem('isLoggedIn', 'true');
//     navigate('/home'); // Redirect to home page after login
//   };

    // useEffect(() => {
    //     if (localStorage.getItem('isLoggedIn') === 'true') {
    //     navigate('/home');
    // }}, [navigate]);

    const handleGoogleLogin = () => {
        window.location.href=`${BACKEND_URL}/auth/google`;
        // localStorage.setItem('isLoggedIn', 'true');
        // navigate('/home');
    }
    return (
        <div className="flex w-screen h-screen justify-around items-center bg-slate-300">
            <button className="bg-slate-400 p-5 rounded-lg hover:bg-slate-500 transition-all ease-in-out duration-500" onClick={handleGoogleLogin}>Google Login</button>
        </div>
    )
}

export default Login