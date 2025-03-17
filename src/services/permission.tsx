import { useRole } from "store/authSlice";
import { useNavigate } from "zmp-ui";

export const ProtectedRoute = ({ children, requiredRole }) => {
    const role = useRole();
    const navigate = useNavigate()

    if (role !== requiredRole) {
       navigate('/403')
    }

    return children;
};