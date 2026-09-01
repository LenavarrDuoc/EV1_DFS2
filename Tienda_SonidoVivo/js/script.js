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
        this.innerHTML = `<header class="main-header">
        
        <div class="marca">
            <a href="index.html">
                <img src="img/logo_main.png" alt="Logo de Sonido Vivo" id="logo">
            </a>
            <h1>Sonido Vivo</h1>
        </div>

        <nav class="navegacion-principal">
            <ul>
                <li><a href="index.html">INICIO</a></li>
                <li><a href="productos.html">CATÁLOGO</a></li>
            </ul>
        </nav>

        <nav class="navegacion-usuario">
            <ul>
                <li><a href="login.html">INICIAR SESIÓN</a></li>
                <li><a href="registro.html">REGISTRARSE</a></li>
            </ul>
        </nav>

    </header>`;

    //Se sacó la referencia de clase activa desde el enlace de inicio y de catálogo para automatizarlo con la función "enlaceActivo()" según la página activa en que se encuentre el usuario.

    this.enlaceActivo(); // Se invoca a la función enlaceActivo() para resaltar el enlace activo en la navegación principal.
    }

    //Definimos la función enlaceActivo() para resaltar/subrayar el enlace activo en la navegación principal.
    //Lo dejamos dentro de la misma clase Header para que solo se ejecute en el header y referenciar a la clase fácilmente con "this".
    enlaceActivo() {
        // Obtiene la ruta actual del navegador
        const pagActual = window.location.pathname.split("/").pop() || "index.html"; // si enlace luego de "/" es vacío, el navegador redirige a index, por lo que es mejor dejar "ó" index.html en caso de llegar a la raíz.
        
        //trabajamos sobre los enlaces de navegación principal (Inicio y Catálogo).
        const enlaceNavPrincipal = this.querySelectorAll(".navegacion-principal a"); //en vez de document.querySelectorAll, usamos this.querySelectorAll para que busque enlaces (<a></a>) solo dentro de la clase navegación-principal.

        //Recorre todos los enlaces de navegación principal y busca la coincidencia del href de cada uno con el obtenido en la página actual.
        // De encontrarlo, agrega la clase "active" al enlace coincidente.
        enlaceNavPrincipal.forEach(enlace => {
            if (enlace.getAttribute("href") === pagActual) {
                enlace.classList.add("active");
            }
        });
    }
}
customElements.define('main-header', Header);

