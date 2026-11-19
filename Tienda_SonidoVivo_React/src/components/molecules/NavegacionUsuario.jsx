import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { GUEST_NAV_ITEMS } from '../../data/navigationData';
import { IconoCarrito } from './IconoCarrito';

export function NavegacionUsuario({ onItemClick, vertical = false }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // Referencia para controlar el modal nativo
    const modalRef = useRef(null);

    // Función que abre el modal en vez de cerrar sesión de golpe
    const handleClickLogout = () => {
        if (onItemClick) onItemClick(); // Cierra el menú lateral en móviles si está abierto
        modalRef.current?.showModal();
    };

    // Función para cancelar y cerrar el modal
    const handleCancelar = () => {
        modalRef.current?.close();
    };

    // Función que efectivamente cierra la sesión
    const handleConfirmarSalir = () => {
        modalRef.current?.close();
        logout();
        navigate('/');
    };

    return (
        <>
            <nav className="navegacion-usuario">
                <ul className={`list-unstyled mb-0 d-flex ${vertical ? 'flex-column gap-3' : 'align-items-center gap-3'}`}>
                    <li onClick={onItemClick}>
                        <IconoCarrito />
                    </li>

                    {user ? (
                        <>
                            <li>
                                <Link to="/perfil" onClick={onItemClick}>
                                    {`MI PERFIL: ${user.nombre}`}
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={handleClickLogout} 
                                    className={`btn-logout ${vertical ? 'w-100 text-center' : ''}`}
                                >
                                    CERRAR SESIÓN
                                </button>
                            </li>
                        </>
                    ) : (
                        GUEST_NAV_ITEMS.map((item) => (
                            <li key={item.path}>
                                <Link to={item.path} onClick={onItemClick}>
                                    {item.label}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </nav>

            {/* Modal de confirmación exclusivo para el Header */}
            <dialog id="modal-cerrar-sesion" ref={modalRef} className="text-center">
                <h4 className="mb-3 fw-bold">Cerrar Sesión</h4>
                <p className="mb-4">¿Estás seguro que deseas cerrar tu sesión?</p>
                <div className="d-flex justify-content-center gap-3">
                    <button 
                        id="btn-cancelar-logout" 
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                    <button 
                        id="btn-confirmar-logout" 
                        onClick={handleConfirmarSalir}
                    >
                        Sí, salir
                    </button>
                </div>
            </dialog>
        </>
    );
}