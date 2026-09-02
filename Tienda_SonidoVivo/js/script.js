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


/* ===== FORMULARIO ===== */
const formulario = document.getElementById("formulario");

if (formulario) {
    let nombre = document.getElementById("nombre");
    let run = document.getElementById("run");
    let correo = document.getElementById("correo");
    let telefono = document.getElementById("telefono");
    let fecNac = document.getElementById("fecNac");
    let btnRegistrarse = document.getElementById("btn-registrarse");

 /*    function validarCamposLlenos() {
        btnRegistrarse.disabled = !formulario.checkValidity(); // Deshabilita el botón si algún campo requerido está vacío o inválido
        if (!formulario.checkValidity()) {
            formulario.reportValidity(); // Muestra las alertas emergentes del navegador en los campos vacíos o inválidos
        }
    }

    formulario.addEventListener("input", validarCamposLlenos); // Valida los campos cada vez que el usuario ingresa datos
    formulario.addEventListener("change", validarCamposLlenos); // Valida los campos cuando el usuario cambia un campo (por ejemplo, selecciona una fecha)
 */
    formulario.addEventListener("submit", function(event){
        //validación nombre:
        if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombre.value)){
            event.preventDefault();
            alert("El nombre debe contener letras y espacios");
            nombre.focus();
            return
        }
        else if (nombre.value.length < 3){
            event.preventDefault();
            alert("El nombre debe tener al menos 3 caracteres");
            nombre.focus();
            return
        }
        
        //validación run:
        if(!/^[0-9kK-]+$/.test(run.value)){
            event.preventDefault();
            alert("El RUN debe contener solo números, guión y dígito verificador");
            run.focus();
            return
        }
        else if(run.value.length <9 || run.value.length >10){
            event.preventDefault();
            alert("El RUN debe tener entre 9 y 10 caracteres");
            run.focus();
            return
        }
        
        //validación run/dv:
        let dvValido = run.value.slice(-2)[0].toUpperCase() === "-" && (run.value.trim().slice(-1).toUpperCase() === "K" || !isNaN(run.value.trim().slice(-1))); 
        if(!dvValido){
            event.preventDefault();
            alert("El RUN debe terminar en - y un dígito verificador válido (0 a 9 o K)");
            run.focus();
            return

        }
        
        //validación correo electrónico:
        let dominiovalido = correo.value.trim().toLowerCase().endsWith(".com") || correo.value.trim().toLowerCase().endsWith(".cl") || correo.value.trim().toLowerCase().endsWith(".org");
        if(!correo.checkValidity() || !dominiovalido){ /*require_tld verifica quie tenga dominio si se declara "true"*/
            event.preventDefault();
            alert("Debe ingresar un correo válido");
            correo.focus();
            return
        }

        //validación teléfono:
        if(!/^[0-9+]+$/.test(telefono.value)){
            event.preventDefault();
            alert("El teléfono debe contener solo números y el signo +");
            telefono.focus();
            return
        }else if(telefono.value.length !== 12 || !telefono.value.startsWith("+")){
            event.preventDefault();
            alert("El teléfono debe tener 12 caracteres e iniciar con +");
            telefono.focus();
            return
        }

        //validación fecha de nacimiento:
        let fecha = new Date(fecNac.value); //fecha completa ingresada
        let anio = fecha.getFullYear(); //extracción de año de fecha ingresada
        let fechaActual = new Date() //fecha actual de sistema
        const difAnios= fechaActual.getFullYear() - fecha.getFullYear();
        const difMeses = fecha.getMonth() - fechaActual.getMonth();
        const difDias = fecha.getDate() - fechaActual.getDate();
        if(anio < 1900 || fecha > fechaActual){ //compara que año ingresado no sea inferior a 1900 y que fecha ingresada comnpleta no sea superior a la actual al momento de ingreso.
            event.preventDefault();
            alert("Debe ingresar una fecha de nacimiento inferior a la fecha actual");
            fecNac.focus();
            return
        }
        else if(difAnios < 18){
            event.preventDefault();
            alert("Debe ser mayor de edad para registrarse.");
            fecNac.focus();
            return
        }
        else if(difAnios === 18){
            if(difMeses > 0 || (difMeses === 0 && difDias > 0)){
                event.preventDefault();
                alert("Debe ser mayor de edad para registrarse.");
                fecNac.focus();
                return;
            }
        }

        // Verifica si todos los campos requeridos están llenos y válidos
        if (formulario.checkValidity()) {
            /* si se realiza un envío de datos para API, debe evitarse el envío nativo HTML
            colocando un event.preventDefault aquí*/
            btnRegistrarse.disabled = true; // Deshabilita el botón de registro para evitar envíos múltiples
            let mensaje = "Registro válido. Enviando datos...";
            console.log(mensaje);
            alert(mensaje);
            // Aquí ejecutas la lógica para registrar al usuario o iniciar sesión
        } else {
            // Muestra las alertas emergentes del navegador en los campos vacíos
            formulario.reportValidity();
        }

    });
}
