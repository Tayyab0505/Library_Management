import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ allowedRole }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to='/' replace />
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to={role === 'admin' ? '/dashboard' : '/student-dashboard'} replace />;
    }

    return <Outlet />

}

export default ProtectedRoute