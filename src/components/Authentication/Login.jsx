import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FiLock, FiMail, } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();

        signInUser(email, password)
            .then((result) => {
                toast.success("Login successful!")
                navigate(location.state?.from || "/");
            })
            .catch((error) => {
                toast.error("Login failed. Please check your Email or Password.");
                console.error(error);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                toast.success("Login successful!");
                navigate(location.state?.from || "/");
            })
            .catch((error) => {
                toast.error("Social login failed. Please try again later.");
                console.error(error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-center">Login now!</h1>
                <form className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center">
                            <FiMail size={25} className="mr-2" />
                            <label className="text-xl">Email</label>
                        </div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="w-full px-3 py-2 border rounded-lg"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center">
                            <FiLock size={25} className="mr-2" />
                            <label className="text-xl">Password</label>
                        </div>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="w-full px-3 py-2 border rounded-lg"
                            onChange={(e) => setPassword(e.target.value)}
                        />
     
                    </div>
                    <div className="space-y-2">
                        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-3 rounded-lg">
                            Login
                        </button>
                        <button onClick={handleGoogleSignIn} className="w-full bg-white border border-gray-400 p-3 flex items-center justify-center rounded-lg">
                            <FcGoogle className="mr-2" />
                            Login With Google
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-blue-500">CREATE AN ACCOUNT</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
