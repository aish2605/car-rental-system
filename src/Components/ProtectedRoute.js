import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Don't forget Outlet
import { AuthContext } from "../context/AuthContext";

// Change 'role' prop to 'allowedRoles'
const ProtectedRoute = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    // 1. Authentication Check: Is the user logged in?
    if (!auth.isLoggedIn) {
        // If not logged in (no token/role in context), redirect to login
        return <Navigate to="/login" />;
    }
    
    // 2. Authorization Check: Is the user's role included in the allowed list?
    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        // If the user's role (e.g., "USER") is not in the allowed list (e.g., ["ADMIN"]), deny access
        console.warn(`Access Denied. User Role: ${auth.role} not in allowed list.`);
        return <Navigate to="/" />;
    }

    // If checks pass, render the child route component
    return <Outlet />; 
};

export default ProtectedRoute;