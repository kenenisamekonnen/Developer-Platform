import React from "react";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try{
            await loginUser({ email, password });
            navigate('/dashboard');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any){
            setError(err.response?.data?.message || 'Login Failed Try Agian');
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <form
                id="form"
                name="form"
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl backdrop-blur-md border border-gray-200"
                >
                <h2 className="mb-6 text-3xl font-bold text-center text-indigo-600">Login</h2>

                {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <button
                    type="submit"
                    name="button"
                    className="w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition duration-200 shadow-md"
                    >
                    Login
                </button>
            </form>
        </div>

    );
};

export default Login;