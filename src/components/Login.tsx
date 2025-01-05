import { BACKEND_URL } from "../config";


const Login = () => {
    const handleGoogleLogin = () => {
        window.open(`${BACKEND_URL}/auth/google`, "_self");
    }
    return (
        <div className="flex w-screen h-screen justify-around items-center bg-slate-300">
            <button className="bg-slate-400 p-5 rounded-lg hover:bg-slate-500 transition-all ease-in-out duration-500" onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    )
}

export default Login