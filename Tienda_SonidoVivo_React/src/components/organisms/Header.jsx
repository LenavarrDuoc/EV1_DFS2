import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import logo_main from '../../assets/img/logo_main.png';
import { IconoCarrito } from "../molecules/IconoCarrito";

function Header() {

    const { user, logout, isAdmin } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <>
            <header className="main-header">
                
                <div className="marca">
                    <a href="/">
                        <img src={logo_main} alt="Logo de Sonido Vivo" id="logo"/>
                    </a>
                    <h1>Sonido Vivo</h1>
                </div>
        
                <nav className="navegacion-principal">
                    <ul>
                        <li><a href="/">INICIO</a></li>
                        <li><a href="/productos">CATÁLOGO</a></li>
                        {isAdmin && (
                            <li><Link to="/admin">ADMINISTRACIÓN</Link></li>
                        )}
                    </ul>
                </nav>
        
                <nav className="navegacion-usuario">
                    <ul>
                        <li>
                            <IconoCarrito />
                        </li>

                        {user ? (
                            <>
                                <li><Link to="/perfil">{user.nombre || 'MI PERFIL'}</Link></li>
                                <li><button onClick={handleLogout} className="btn-logout">CERRAR SESIÓN</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">INICIAR SESIÓN</Link></li>
                                <li><Link to="/registro">REGISTRARSE</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
        
            </header>
        </>
    )
}

export default Header