import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({Children})=>{
    const {token}= useContext(AuthContext);

    if(!token){
        return(
            <Navigate to="/"/>
        )
    }
    return Children;
}

export default ProtectedRoute;