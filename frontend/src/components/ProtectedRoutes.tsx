import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { JSX } from "react";

export const ProtectedRoutes = ({children} : {children: JSX.Element}) => {
    const { token } = useAuthStore();
    if(!token){
        return <Navigate to={"/login"} replace/>
    }
    return children;
}