import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.userInfo?._id ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
}

export default RequireAuth;
