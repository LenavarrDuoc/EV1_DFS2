import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NAV_ITEMS } from '../../data/navigationData';

export function NavegacionPrincipal({ onItemClick, vertical = false }) {
    const { isAdmin } = useAuth();

    // Filtra los ítems que requieren rol de admin si el usuario no lo es
    const itemsVisibles = NAV_ITEMS.filter(item => !item.requireAdmin || isAdmin);

    return (
        /* carga los enlaces de navegación que estén definidos en navegacion.js en /data */
        <nav className="navegacion-principal">
            <ul className={`list-unstyled mb-0 d-flex ${vertical ? 'flex-column gap-3' : 'align-items-center gap-4'}`}> {/* el operador ternario verifica si el elemento de navegación viene con disposición vertical u horizontal (booleano) para saber cómo alinear el elemento */}
                {itemsVisibles.map((item) => (
                    <li key={item.path}>
                        <Link to={item.path} onClick={onItemClick}> {/* se remplazan etiquetas <a> por <Link> para no ir a otro enlace y recargar toda la página, sino recargar componentes dentro de la página. OnItemClick recibe si es un cerrarOffcanvas para móvil*/}
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}