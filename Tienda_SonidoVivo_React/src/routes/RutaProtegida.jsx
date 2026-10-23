import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children, requireAdmin = false }) {
    
    const { user, isAdmin } = useAuth();

    // Si no está autenticado, redirigir al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si requiere rol de admin y el usuario no lo es, redirigir al home
    if (requireAdmin && !isAdmin) {
        alert("Acceso denegado: Se requieren permisos de administrador.");
        return <Navigate to="/" replace />;
    }

    return children;
    
}

export default RutaProtegida;