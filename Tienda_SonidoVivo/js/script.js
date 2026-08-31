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