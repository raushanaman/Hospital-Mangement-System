import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login as loginService } from "../../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await loginService({ email, password });
            const { user: userData, token } = response.data;
            login(userData, token);
            navigate(userData.role === "doctor" ? "/doctor/dashboard" : "/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Sign in to Hospital Management System</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm shadow-md"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
