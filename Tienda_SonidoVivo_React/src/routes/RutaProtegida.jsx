import { Navigate } from 'react-router-dom';
import { useAuth  } from '../context/AuthContext';

export const RutaProtegida = ({ children }) => {

    const { user, isAdmin } = useAuth();

    if (!user || !isAdmin) {
        return <Navigate to="/login" replace/>
    }

    return children;
    
};