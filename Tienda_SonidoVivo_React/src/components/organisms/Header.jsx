import logo_main from '../assets/img/logo_main.png'

function Header() {
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
                    </ul>
                </nav>
        
                <nav className="navegacion-usuario">
                    <ul>
                        <li><a href="/login">INICIAR SESIÓN</a></li>
                        <li><a href="/registro">REGISTRARSE</a></li>
                    </ul>
                </nav>
        
            </header>
        </>
    )
}

export default Header