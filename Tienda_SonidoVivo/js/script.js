class Footer extends HTMLElement {
    connectedCallback() {
    const fono = "+56988888888";
    const fonoWsp = "+56999999999";
    const correo = "sonidovivo@yimeil.com";
    
    const fonoLimpio = fono.replace(/\D/g,'');
    const fonoWspLimpio = fonoWsp.replace(/\D/g,'');

        this.innerHTML = `
            <footer>
                <p>@ SonidoVivo 2026 - Todos los derechos reservados</p>
                <p><b>Teléfono: <a href="tel:+${fonoLimpio}">${fono}</a></b></p>
                <p><b>Whatsapp: <a href="https://wa.me/${fonoWspLimpio}">${fonoWsp}</a></b></p>
                <p><b>Email: <a href="mailto:${correo}">${correo}</a></b></p>
            </footer>
        `;
    }
}
customElements.define('main-footer', Footer);

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header>
        
        <div class="marca">
            <a href="index.html">
                <img src="img/logo_main.png" alt="Logo de Sonido Vivo" id="logo">
            </a>
            <h1>Sonido Vivo</h1>
        </div>

        <nav class="navegacion-principal">
            <ul>
                <li><a href="index.html" class="active">INICIO</a></li>
                <li><a href="productos.html">CATÁLOGO</a></li>
            </ul>
        </nav>

        <nav class="navegacion-usuario">
            <ul>
                <li><a href="login.html">INICIAR SESIÓN</a></li>
                <li><a href="registro.html">REGISTRARSE</a></li>
            </ul>
        </nav>

    </header>}`;
    }
}
customElements.define('main-header', Header);