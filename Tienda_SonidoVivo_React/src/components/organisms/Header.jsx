import { Link } from 'react-router-dom';
import logo_main from '../../assets/img/logo_main.png';
import { NavegacionPrincipal } from '../molecules/NavegacionPrincipal';
import { NavegacionUsuario } from '../molecules/NavegacionUsuario';

/* Nuevo header responsivo a navegación para carga de componentes en vivo con Uso de Document Objec Model (DOM) en vez de elementos duplicados, migrando a código DRY =  el "Don't Repeat Yourself." */
function Header() {
    const abrirOffcanvas = () => { /* Función de apertura del menú lateral off canvas del botón hamburguesa para pantallas móviles. */
        const el = document.getElementById('headerOffcanvas');
        if (el) { /* "el" = element = el elemento del DOM que corresponde al offcanvas */
            if (window.bootstrap && window.bootstrap.Offcanvas) {
                const inst = window.bootstrap.Offcanvas.getOrCreateInstance(el); /* valor constante que guarda la instancia del componente de menú lateral off canvas de Bootstrap. */
                inst.show(); /* Muestra el elemento off canvas una vez instanciado */
            } else {
                el.classList.add('show'); /* Si ya existe el elemento off canvas, lo agrega a la lista de elementos visibles y hace visible su estilo. */
                el.style.visibility = 'visible';
            }
        }
    };

    const cerrarOffcanvas = () => { /* Función de cierre del menú lateral off canvas del botón hamburguesa para pantallas móviles. */
        const el = document.getElementById('headerOffcanvas');
        if (el) {
            if (window.bootstrap && window.bootstrap.Offcanvas) {
                const inst = window.bootstrap.Offcanvas.getInstance(el); /* Guarda la instancia del menú lateral off canvas de Bootstrap. */
                if (inst) inst.hide(); /* Lo oculta, de existir */
            }
            el.classList.remove('show'); /* lo remueve de los elementos visibles y borra su visibilidad de estilo. */
            el.style.visibility = '';
        }
    };

    return (
        <>
            {/* Header distribuye 3 bloques independientes en pantalla ancha */}
            <header className="main-header navbar navbar-dark d-flex flex-nowrap justify-content-between align-items-center px-3 sticky-top">
                
                {/* 1. BLOQUE IZQUIERDO: Logo y Marca */}
                <div className="marca d-flex align-items-center">
                    <Link to="/">
                        <img src={logo_main} alt="Logo de Sonido Vivo" id="logo"/> {/* Ahora, el logo no es un enlace del tipo <a>, sino <Link>. Permite uso de DOM para recargar componentes en vez de la página. */}
                    </Link>
                    <h1>Sonido Vivo</h1>
                </div>

                {/* 2. BLOQUE CENTRAL: Navegación Principal (Solo escritorio d-lg-flex) */}
                <div className="d-none d-lg-flex align-items-center">
                    <NavegacionPrincipal /> {/* Se cargamn los elementos que estén desarrollados en NavegacionPrincipal en /molecules*/}
                </div>

                {/* 3. BLOQUE DERECHO: Navegación Usuario (Solo escritorio d-lg-flex) */}
                <div className="d-none d-lg-flex align-items-center">
                    <NavegacionUsuario /> {/* Se cargan los elementos que estén desarrollados en NavegacionUsuario en /molecules (botones de sesión, perfil y registro)*/}
                </div>

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

            {/* MENÚ LATERAL OFFCANVAS (Móviles). Misma logica de arriba, pero con menú hamburgesa y menú lateral off canvas de Bootstrap. */}
            <div 
                className="offcanvas offcanvas-end d-lg-none text-bg-dark" 
                tabIndex="-1" /* elemento de HTML que permite dar prioridad y orden de navegación de elementos en página con la tecla TAB o elementos de asistencia de navegación. 1 = personalizado. Bootstrap lo requiere para la asistencia de navegación.  */
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
                    {/* Navegación Principal en Móvil (partes centrales del sitio web) */}
                    <div className="mb-4">
                        <NavegacionPrincipal vertical onItemClick={cerrarOffcanvas} />
                    </div>

                    {/* Opciones de Usuario (sesión, perfil, registro) y Carrito en Móvil */}
                    <div className="border-top border-secondary border-opacity-25 pt-4">
                        <NavegacionUsuario vertical onItemClick={cerrarOffcanvas} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;