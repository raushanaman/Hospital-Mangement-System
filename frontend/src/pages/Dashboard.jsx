import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = ()=>{

    const {user, logout}= useContext(AuthContext);

    console.log("user:", user);
    // console.log("Token", token);


    return (
        <div>
            
        <h1>Dashboard Page</h1>
        <h2>{user?.name}</h2>
        <h2>{user?.role}</h2>
        
        <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;