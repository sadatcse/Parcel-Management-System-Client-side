import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../../providers/AuthProvider";

const PrivateRoot = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location.pathname }}></Navigate>;
};

export default PrivateRoot;

PrivateRoot.propTypes = {
    children: PropTypes.node
}