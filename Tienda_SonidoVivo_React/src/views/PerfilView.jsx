import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function PerfilView() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Si por alguna razón el usuario accede sin sesión, se redirige al login
    if (!user) {
        return (
            <main>
                <section id="perfil-usuario">
                    <div className="perfil-card">
                        <h2>Acceso Restringido</h2>
                        <p>Debes iniciar sesión para ver los datos de tu perfil.</p>
                        <Link to="/login" className="btn-iniciar-sesion-auxiliar">
                            INICIAR SESIÓN
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Obtener la inicial para el avatar
    const inicial = user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U';

    // Formatear fecha YYYY-MM-DD a formato local chileno sin desfase UTC
    const fechaNacimientoRaw = user.fechaNacimiento || user.fecNac;
    const fechaFormateada = fechaNacimientoRaw
        ? fechaNacimientoRaw.split('-').reverse().join('-')
        : 'No especificada';

    return (
        <main>
            <section id="perfil-usuario">
                <div className="perfil-card">
                    <div className="perfil-header">
                        <div className="perfil-avatar">
                            {inicial}
                        </div>
                        <div className="perfil-titulo">
                            <h2>{user.nombre}</h2>
                            <span className="perfil-rol">
                                {user.nombreRol || user.rol || 'Cliente'}
                            </span>
                        </div>
                    </div>

                    <div className="perfil-grid">
                        <div className="perfil-campo">
                            <label>Nombre Completo</label>
                            <p>{user.nombre || 'No especificado'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>RUN</label>
                            <p>{user.run || 'No especificado'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Correo Electrónico</label>
                            <p>{user.correo || 'No especificado'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Teléfono</label>
                            <p>{user.telefono || 'No especificado'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Fecha de Nacimiento</label>
                            <p>{fechaFormateada}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Dirección</label>
                            <p>{user.direccion || 'No especificada'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Comuna</label>
                            <p>{user.comuna || 'No especificada'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Estilo Musical Favorito</label>
                            <p>{user.nombreEstilo || user.estiloMusical || 'No especificado'}</p>
                        </div>

                        <div className="perfil-campo">
                            <label>Categoría de Instrumento Preferida</label>
                            <p>{user.nombreCategoriaInst || user.categoriaInstrumento || 'No especificada'}</p>
                        </div>
                    </div>

                    <div className="perfil-acciones">
                        <button 
                            type="button" 
                            className="btn-logout" 
                            onClick={handleLogout}
                        >
                            CERRAR SESIÓN
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default PerfilView;