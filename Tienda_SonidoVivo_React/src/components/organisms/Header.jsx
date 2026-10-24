import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import logo_main from '../../assets/img/logo_main.png';
import { IconoCarrito } from "../molecules/IconoCarrito";

function Header() {
    const { user, logout, isAdmin } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const abrirOffcanvas = () => {
        const el = document.getElementById('headerOffcanvas');
        if (el) {
            if (window.bootstrap && window.bootstrap.Offcanvas) {
                const inst = window.bootstrap.Offcanvas.getOrCreateInstance(el);
                inst.show();
            } else {
                el.classList.add('show');
                el.style.visibility = 'visible';
            }
        }
    };

    const cerrarOffcanvas = () => {
        const el = document.getElementById('headerOffcanvas');
        if (el) {
            if (window.bootstrap && window.bootstrap.Offcanvas) {
                const inst = window.bootstrap.Offcanvas.getInstance(el);
                if (inst) inst.hide();
            }
            el.classList.remove('show');
            el.style.visibility = '';
        }
    };

    const handleLogout = () => {
        logout();
        cerrarOffcanvas();
        navigate("/");
    };

    return (
        <>
            {/* Header distribuye 3 bloques independientes en pantalla ancha */}
            <header className="main-header navbar navbar-dark d-flex flex-nowrap justify-content-between align-items-center px-3 sticky-top">
                
                {/* 1. BLOQUE IZQUIERDO: Logo y Marca */}
                <div className="marca d-flex align-items-center">
                    <a href="/">
                        <img src={logo_main} alt="Logo de Sonido Vivo" id="logo"/>
                    </a>
                    <h1>Sonido Vivo</h1>
                </div>

                {/* 2. BLOQUE CENTRAL: Navegación Principal (Solo escritorio d-lg-flex) */}
                <nav className="navegacion-principal d-none d-lg-flex align-items-center">
                    <ul className="d-flex align-items-center mb-0 gap-4 list-unstyled">
                        <li><a href="/">INICIO</a></li>
                        <li><a href="/productos">CATÁLOGO</a></li>
                        {isAdmin && (
                            <li><Link to="/admin">ADMINISTRACIÓN</Link></li>
                        )}
                    </ul>
                </nav>

                {/* 3. BLOQUE DERECHO: Navegación Usuario (Solo escritorio d-lg-flex) */}
                <nav className="navegacion-usuario d-none d-lg-flex align-items-center">
                    <ul className="d-flex align-items-center gap-3 mb-0 list-unstyled">
                        <li>
                            <IconoCarrito />
                        </li>

                        {user ? (
                            <>
                                <li><Link to="/perfil">{'MI PERFIL: ' + user.nombre}</Link></li>
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

                {/* BOTÓN HAMBURGUESA (Solo visible en móviles d-lg-none) */}
                <button 
                    className="navbar-toggler border-0 shadow-none d-lg-none ms-auto" 
                    type="button" 
                    onClick={abrirOffcanvas}
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

            </header>

            {/* MENÚ LATERAL OFFCANVAS (Móviles) */}
            <div 
                className="offcanvas offcanvas-end d-lg-none text-bg-dark" 
                tabIndex="-1" 
                id="headerOffcanvas" 
                aria-labelledby="headerOffcanvasLabel"
                style={{ backgroundColor: 'var(--color_1, #212529)' }}
            >
                <div className="offcanvas-header border-bottom border-secondary border-opacity-25">
                    <h5 className="offcanvas-title text-white fw-bold mb-0" id="headerOffcanvasLabel">
                        Sonido Vivo
                    </h5>
                    <button 
                        type="button" 
                        className="btn-close btn-close-white" 
                        onClick={cerrarOffcanvas}
                        aria-label="Cerrar"
                    ></button>
                </div>

                <div className="offcanvas-body d-flex flex-column justify-content-between p-4">
                    {/* Navegación Principal en Móvil */}
                    <nav className="navegacion-principal mb-4">
                        <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                            <li>
                                <a href="/" onClick={cerrarOffcanvas}>INICIO</a>
                            </li>
                            <li>
                                <a href="/productos" onClick={cerrarOffcanvas}>CATÁLOGO</a>
                            </li>
                            {isAdmin && (
                                <li>
                                    <Link to="/admin" onClick={cerrarOffcanvas}>ADMINISTRACIÓN</Link>
                                </li>
                            )}
                        </ul>
                    </nav>

                    {/* Opciones de Usuario y Carrito en Móvil */}
                    <nav className="navegacion-usuario border-top border-secondary border-opacity-25 pt-4">
                        <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                            <li onClick={cerrarOffcanvas}>
                                <IconoCarrito />
                            </li>

                            {user ? (
                                <>
                                    <li>
                                        <Link to="/perfil" onClick={cerrarOffcanvas}>
                                            {'MI PERFIL: ' + user.nombre}
                                        </Link>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={handleLogout} 
                                            className="btn-logout w-100 text-center"
                                        >
                                            CERRAR SESIÓN
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" onClick={cerrarOffcanvas}>
                                            INICIAR SESIÓN
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/registro" onClick={cerrarOffcanvas}>
                                            REGISTRARSE
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Header;