import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axios";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser, setToken } = useContext(AuthContext);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/auth/login",
                {
                    email, password,
                }
            );
            login(response.data.user, response.data.token);
            console.log("login successful")
            console.log(response.data);
        } catch (error) {

            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log("Network error - backend server not running");
            }

        }
    }

    return (
        <div>

            <h1>Login page</h1>

            <input type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}

            />
            <br /><br />

            <input type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <br /><br />

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;