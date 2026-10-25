import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GUEST_NAV_ITEMS } from '../../data/navigation';
import { IconoCarrito } from './IconoCarrito';

export function NavegacionUsuario({ onItemClick, vertical = false }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { /* función que cierra sesion */
        logout();
        if (onItemClick) onItemClick(); /* permite cerrar el offcanvas en dispositivos móviles e ir a home.*/
        navigate('/');
    };

    return (
        <nav className="navegacion-usuario">
            <ul className={`list-unstyled mb-0 d-flex ${vertical ? 'flex-column gap-3' : 'align-items-center gap-3'}`}> {/* el operador ternario permite verificar disposición del elemento y cómo alinearlo */}
                <li onClick={onItemClick}>
                    <IconoCarrito /> {/* ícono de carrito de compras, que al hacer click, invoca onItemClick para cerrar offcanvas en móviles. */}
                </li>

                {user ? ( /* el ternario permite verificar si hay un usuario con sesión iniciada. De lo contrario, carga elementos de GUEST_NAV_ITEMS */
                    <>
                        <li>
                            <Link to="/perfil" onClick={onItemClick}> {/* de iniciar sesión, permite cargar elemento con nombre del usuario y un link a futuro feature de perfil.*/}
                                {`MI PERFIL: ${user.nombre}`}
                            </Link>
                        </li>
                        <li>
                            <button 
                                onClick={handleLogout} /* invoca función de cerrar sesión al click. */
                                className={`btn-logout ${vertical ? 'w-100 text-center' : ''}`} /* botón de cerrar sesión */
                            >
                                CERRAR SESIÓN
                            </button>
                        </li>
                    </>
                ) : (
                    GUEST_NAV_ITEMS.map((item) => ( /* carga de elementos de GUEST_NAV_ITEMS en caso de no haber usuario con sesión iniciada. */
                        <li key={item.path}>
                            <Link to={item.path} onClick={onItemClick}>
                                {item.label}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </nav>
    );
}