import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import CheckAdmin from "../Hook/CheckAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const isAdmin = CheckAdmin();
    const location = useLocation();


    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;