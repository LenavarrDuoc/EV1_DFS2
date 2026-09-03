class Usuario{
    //Constructor
    constructor(nombre, run, correo, telefono, fecNac, password){
        this.nombre = nombre.trim();
        this.run = run.trim();
        this.correo = correo.trim();
        this.telefono = telefono.trim();
        this.fecNac = new Date(fecNac.trim() + "T00:00:00"); //se agrega T00:00:00 para evitar errores de cálculo por zona horaria en ciertos casos.
        this.password = password.trim();
    }

} 

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
        const sesionStatus = sessionStorage.getItem('sesionActiva') === 'true';
        if(!sesionStatus || sesionStatus == null){

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
        } else {
            const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));

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
                    <li><span>Hola, ${usuario.nombre}</span></li>
                    <li><a href="#" id="link-cerrar-sesion">CERRAR SESIÓN</a></li>
                </ul>
            </nav>
    
        </header>

        <!-- Dialog de confirmación de cierre de sesión. -->
        <dialog id="modal-cerrar-sesion">
                <div class="modal-contenido">
                    <h3>¿Cerrar Sesión?</h3>
                    <p>¿Estás seguro de que deseas salir del sistema?</p>
                    <div class="modal-acciones">
                        <button type="button" id="btn-cancelar-logout">Cancelar</button>
                        <button type="button" id="btn-confirmar-logout">Sí, salir</button>
                    </div>
                </div>
            </dialog>
        `;
        // Configurar los eventos del modal solo si la sesión está abierta
            this.configurarCierreSesion();
        }

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

    configurarCierreSesion() {
        // Usamos this.querySelector para buscar solo dentro de este Web Component
        const linkCerrar = this.querySelector("#link-cerrar-sesion");
        const modal = this.querySelector("#modal-cerrar-sesion");
        const btnCancelar = this.querySelector("#btn-cancelar-logout");
        const btnConfirmar = this.querySelector("#btn-confirmar-logout");

        if (linkCerrar && modal) {
            // Abrir el modal al pulsar el enlace
            linkCerrar.addEventListener("click", (e) => {
                e.preventDefault();
                modal.showModal();
            });

            // Cerrar el modal sin hacer nada
            btnCancelar.addEventListener("click", () => {
                modal.close();
            });

            // Confirmar salida
            btnConfirmar.addEventListener("click", () => {
                sessionStorage.removeItem("usuarioActivo");
                sessionStorage.removeItem('sesionActiva')
                window.location.href = "index.html";
            });
        }
    }

}
customElements.define('main-header', Header);


const login = document.getElementById("login");
const registro = document.getElementById("registro");

/* ===== INICIO FORMULARIO REGISTRO===== */
const formulario = document.getElementById("formulario");

if (formulario && registro) {
    //Se reciben los objetos DOM (Document Object Model) de los campos del formulario para poder manipularlos y validarlos.
    //Por lo tanto, las variables a continuación son objetos tipo DOM y no strings, por lo que se debe usar la propiedad .value para obtener el valor ingresado por el usuario.
    let nombre = document.getElementById("nombre");
    let run = document.getElementById("run");
    let correo = document.getElementById("correo");
    let telefono = document.getElementById("telefono");
    let fecNac = document.getElementById("fecNac");
    let btnRegistrarse = document.getElementById("btn-registrarse");

    //Se comentó el código ya que se pretendía deshabilitar botón "registrar" si no estaban llenos todos los campos, pero es mejor permitir que la página advierta de los campos faltantes.
    //Se deja comentado en caso de requerir la función más adelante
 /*    function validarCamposLlenos() {
        btnRegistrarse.disabled = !formulario.checkValidity(); // Deshabilita el botón si algún campo requerido está vacío o inválido
        if (!formulario.checkValidity()) {
            formulario.reportValidity(); // Muestra las alertas emergentes del navegador en los campos vacíos o inválidos
        }
    }

    formulario.addEventListener("input", validarCamposLlenos); // Valida los campos cada vez que el usuario ingresa datos
    formulario.addEventListener("change", validarCamposLlenos); // Valida los campos cuando el usuario cambia un campo (por ejemplo, selecciona una fecha)
 */
    
    //Se declaró como "async function" en vez de solo "function" debido a que se implementó la encriptación de contraseña que utiliza la función "await". De otra forma, no funcionaría en sincrónico al no esperar a que se haga la encriptación para poder mandar los datos.
    //Tener en consideración que esa encriptación es solo para probar con un usuario local. Si no se realizara, no sería requerido que sea una función asíncrona.
    formulario.addEventListener("submit", async function(event){
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

        //verificación de existencia de cuenta con el mismo correo electrónico en localStorage:
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        let correoExistente = usuariosRegistrados.some(usuario => usuario.correo.trim().toLowerCase() === correo.value.trim().toLowerCase());
        if(correoExistente){
            event.preventDefault();
            alert("Ya existe una cuenta registrada con este correo electrónico");
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
        let fecha = new Date(fecNac.value + "T00:00:00"); //fecha completa ingresada. Debe llevar T00:00:00 para evitar errores de cálculo por zona horaria en ciertos casos.
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

        //Validación de contraseña:
        let passInput = document.getElementById("password-registro");
        let pass = passInput.value;
        let passRepeat = document.getElementById("repeat-password-registro");
        let passR = passRepeat.value;

        if (pass.length < 8) {
            event.preventDefault();
            alert("La contraseña debe tener al menos 8 caracteres.");
            passInput.focus();
            return;
        }else if (!/[A-Z]/.test(pass)) {
            event.preventDefault();
            alert("La contraseña debe contener al menos una letra mayúscula.");
            passInput.focus();
            return;
        }else if (!/[a-z]/.test(pass)) {
            event.preventDefault();
            alert("La contraseña debe contener al menos una letra minúscula.");
            passInput.focus();
            return;
        }else if (!/[0-9]/.test(pass)) {
            event.preventDefault();
            alert("La contraseña debe contener al menos un número.");
            passInput.focus();
            return;
        }else if(!/[-+!@#$%^&*(),.?":{}|<>]/.test(pass)) {
            event.preventDefault();
            alert("La contraseña debe contener al menos un carácter especial.");
            passInput.focus();
            return;
        }else if (/\s/.test(pass)) {
            event.preventDefault();
            alert("La contraseña no debe contener espacios.");
            passInput.focus();
            return;
        }else if (pass === nombre.value || pass === run.value || pass === correo.value || pass === telefono.value || pass === fecNac.value) {
            event.preventDefault();
            alert("La contraseña no debe ser igual a ninguno de los otros campos.");
            passInput.focus();
            return;
        } else if (pass.toLowerCase().includes("password") || pass.toLowerCase().includes("1234")) {
            event.preventDefault();
            alert("La contraseña no debe contener palabras comunes como 'password' o secuencias como '1234'.");
            passInput.focus();
            return;
        }else if(pass !== passR){
            event.preventDefault();
            alert("Las contraseñas no coinciden.");
            passRepeat.focus();
            return;
        }

        // Verifica si todos los campos requeridos están llenos y válidos
        if (formulario.checkValidity()) {
            /* si se realiza un envío de datos para API, debe evitarse el envío nativo HTML
            colocando un event.preventDefault aquí*/
            btnRegistrarse.disabled = true; // Deshabilita el botón de registro para evitar envíos múltiples

            //Hasheo de la contraseña usando SHA-256 para el usuario mock en local.
            const conversionBinario = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
            
            //Conversión necesaria a texto legible (Hexadecimal de 64 caracteres)
            const passwordEncriptada = Array.from(new Uint8Array(conversionBinario)).map(b => b.toString(16).padStart(2, '0')).join('');

            //Instanciación de la clase Usuario con los datos ingresados en el formulario:
            //No pasar variable "fecha" en los atributos sino que fecNac.value (directamente el valor del DOM) ya que el constructor convierte a fecha.
            //Esto es mejor práctica ya que es la clase quien tiene la responsabilidad de asegurar la integridad de datos al momento de instanciar el objeto. Debe ser defensivo.
            const uMock = new Usuario(nombre.value, run.value, correo.value, telefono.value, fecNac.value, passwordEncriptada);

            //Persistencia de datos en localStorage para simular un registro de usuario:
            usuariosRegistrados.push(uMock);
            localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

            let mensaje = `Registro válido. Usuario ${uMock.nombre} registrado. Se ha enviado un correo de confirmación a ${uMock.correo}.`;
            console.log(mensaje);
            alert(mensaje);
            window.location.href = "login.html";
            formulario.reset();
            // Aquí ejecutas la lógica para registrar al usuario o iniciar sesión
        } else {
            // Muestra las alertas emergentes del navegador en los campos vacíos
            formulario.reportValidity();
        }
        
    });
}
/* ===== FIN FORMULARIO REGISTRO ===== */



/* ===== INICIO FORMULARIO LOGIN ===== */
if (formulario && login) {
    formulario.addEventListener("submit", async function(event){
        event.preventDefault();
        
        // IDs actualizados según tu HTML ("correo" y "contrasena")
        let correoLogin = document.getElementById("correo");
        let passInput = document.getElementById("contrasena");
        const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
        
        if (!correoLogin || !passInput) {
            console.error("No se encontraron los campos del formulario en el DOM.");
            return;
        }
        
        let pass = passInput.value;
        let mensajeCredenciales = "Credenciales de Usuario y/o Contraseña inválidas."; 
        
        // Validación correo electrónico:
        let dominiovalido = correoLogin.value.trim().toLowerCase().endsWith(".com") || 
        correoLogin.value.trim().toLowerCase().endsWith(".cl") || 
        correoLogin.value.trim().toLowerCase().endsWith(".org");
        
        if(!correoLogin.checkValidity() || !dominiovalido){
            alert("Debe ingresar un correo válido");
            correoLogin.focus();
            return;
        }
        
        if(pass.length < 8){
            alert("La contraseña debe ser de 8 caracteres mínimos");
            passInput.focus();
            return;
        }

        // Verificación de existencia de cuenta en localStorage:
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuarioEncontrado = usuariosRegistrados.find(u => u.correo.toLowerCase() === correoLogin.value.trim().toLowerCase());
        
        if(!usuarioEncontrado){
            alert(mensajeCredenciales);
            correoLogin.value = "";
            passInput.value = "";
            correoLogin.focus();
            return;
        }
        
        // Encriptación de contraseña ingresada:
        const conversionBinario = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
        const passwordEncriptada = Array.from(new Uint8Array(conversionBinario)).map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Validación de contraseña de usuario:
        if(passwordEncriptada === usuarioEncontrado.password){
            alert(`¡Hola, ${usuarioEncontrado.nombre}! Le damos la bienvenida al sistema de Sonido Vivo.`);
            
            if (btnIniciarSesion) btnIniciarSesion.disabled = true;
            
            // Guardar sesión persistente en sessionStorage
            const usuarioSesionObj = { ...usuarioEncontrado };
            delete usuarioSesionObj.password;
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioSesionObj));
            sessionStorage.setItem('sesionActiva', true)
            
            formulario.reset();
            window.location.href = "index.html";
            
        } else {
            alert(mensajeCredenciales);
            correoLogin.value = "";
            passInput.value = "";
            correoLogin.focus();
        }
    });
    
    const btnIrRegistro = document.getElementById("btn-ir-registro");
    if(btnIrRegistro){
        btnIrRegistro.addEventListener("click", function(){
            window.location.href = "registro.html";
        });
        
    }
}

/* ===== FIN FORMULARIO LOGIN ===== */



//Input de contraseña personalizado:
class PasswordInput extends HTMLElement {
    connectedCallback() {
        const inputId = this.getAttribute('input-id') || 'contrasena';
        const name = this.getAttribute('name') || inputId;
        const placeholder = this.getAttribute('placeholder') || '';
        const required = this.hasAttribute('required') ? 'required' : '';
        const labelText = this.getAttribute('label-text') || 'Contraseña:';

        // Inyección HTML directa en Light DOM para mantener compatibilidad con el formulario
        this.innerHTML = `
        <label for="${inputId}">${labelText}</label>
            <div class="password-wrapper">
                <input type="password" id="${inputId}" name="${name}" placeholder="${placeholder}" ${required}>
                <button type="button" class="btn-toggle-pass" aria-label="Mostrar u ocultar contraseña" style="width: min-content; height: min-content;">👁️</button>
            </div>
        `;
        //todos los atributos de la etiqueta input se pasan por variables según las variavbles que se leingresen a la etiqueta de clase <password-input>
        
        //saca contenido y estado de input y botón para poder manipularlos con el evento click del botón.
        const input = this.querySelector('input');
        const btn = this.querySelector('.btn-toggle-pass');

        // Evento click para alternar la visibilidad de la contraseña
        btn.addEventListener('click', () => {
            const esPassword = input.type === 'password';
            input.type = esPassword ? 'text' : 'password'; //si input.type da true a password, el evento click lo convierte a type text, y viceversa.
            btn.textContent = esPassword ? '🙈' : '👁️';
        });
    }

    // Permite leer el valor directamente si selecciones la etiqueta custom
    get value() {
        const input = this.querySelector('input');
        return input ? input.value : '';
    }
}

customElements.define('password-input', PasswordInput);
/*
=== PRODUCTOS ===
*/
const productos = {

    "sv-strat-01": {

        nombre: "Guitarra Eléctrica SV-Strat 01",

        imagen: "img/producto-1.png",

        categoria: "Instrumentos musicales",

        descripcion:
            "Guitarra eléctrica de diseño clásico, ideal para rock, blues y pop. Destaca por su versatilidad y por ofrecer una excelente opción para músicos que buscan comenzar o mejorar su experiencia con guitarra eléctrica.",

        precio: "$249.990",

        caracteristicas: [
            "Diseño clásico y versátil.",
            "Ideal para rock, blues y pop.",
            "Pensada para músicos principiantes y usuarios con mayor experiencia.",
            "Producto perteneciente al catálogo de Sonido Vivo."
        ]

    },


    "sv-studio-h1": {

        nombre: "Auriculares SV-Studio H1",

        imagen: "img/producto-2.png",

        categoria: "Audio",

        descripcion:
            "Auriculares de monitoreo diseñados para escuchar música con claridad y detalle. Su diseño circumaural permite una experiencia cómoda, siendo una excelente alternativa para practicar, producir música o disfrutar de tus canciones favoritas.",

        precio: "$79.990",

        caracteristicas: [
            "Diseño circumaural.",
            "Orientados a monitoreo y reproducción de audio.",
            "Cómodos para sesiones prolongadas.",
            "Adecuados para practicar, producir y escuchar música."
        ]

    },


    "sv-mic-pro-01": {

        nombre: "Micrófono SV-Mic Pro 01",

        imagen: "img/producto-3.png",

        categoria: "Audio",

        descripcion:
            "Micrófono de condensador orientado a grabación y creación de contenido. Destaca por su diseño profesional y por ser una alternativa ideal para grabar voces, instrumentos y podcasts con mayor claridad.",

        precio: "$119.990",

        caracteristicas: [
            "Micrófono de condensador.",
            "Orientado a grabación y creación de contenido.",
            "Adecuado para voces e instrumentos.",
            "Alternativa para grabación de podcasts."
        ]

    },


    "sv-key-61": {

        nombre: "Teclado Digital SV-Key 61",

        imagen: "img/producto-4.png",

        categoria: "Instrumentos musicales",

        descripcion:
            "Teclado digital de 61 teclas, pensado para estudiantes y músicos que buscan practicar y desarrollar sus habilidades musicales.",

        precio: "$189.990",

        caracteristicas: [
            "61 teclas.",
            "Pensado para estudiantes y músicos.",
            "Adecuado para practicar.",
            "Ideal para desarrollar habilidades musicales."
        ]

    },


    "sv-bass-4": {

        nombre: "Bajo Eléctrico SV-Bass 4",

        imagen: "img/producto-5.png",

        categoria: "Instrumentos musicales",

        descripcion:
            "Bajo eléctrico de cuatro cuerdas con un diseño cómodo y versátil para acompañar distintos estilos y proyectos musicales.",

        precio: "$229.990",

        caracteristicas: [
            "Cuatro cuerdas.",
            "Diseño cómodo.",
            "Versátil para distintos estilos musicales.",
            "Adecuado para diferentes proyectos musicales."
        ]

    },


    "sv-amp-20": {

        nombre: "Amplificador SV-Amp 20",

        imagen: "img/producto-6.png",

        categoria: "Amplificación",

        descripcion:
            "Amplificador compacto ideal para practicar con guitarra eléctrica y disfrutar de un sonido claro en espacios pequeños.",

        precio: "$139.990",

        caracteristicas: [
            "Diseño compacto.",
            "Pensado para guitarra eléctrica.",
            "Adecuado para practicar.",
            "Ideal para espacios pequeños."
        ]

    }

};


/*
=== CARGAR PRODUCTO ===
*/
function cargarProducto() {

    const elementoNombre =
        document.getElementById("producto-nombre");

    /*
        Si no existe este elemento,
        significa que no estamos en producto.html.
    */
    if (!elementoNombre) {
        return;
    }


    const parametros =
        new URLSearchParams(window.location.search);

    const idProducto =
        parametros.get("producto");


    /*
        Si no se especifica un producto,
        se muestra la guitarra por defecto.
    */
    const producto =
        productos[idProducto] || productos["sv-strat-01"];


    const imagen =
        document.getElementById("producto-imagen");

    const categoria =
        document.querySelector(".producto-categoria");

    const descripcion =
        document.getElementById("producto-descripcion");

    const precio =
        document.getElementById("producto-precio");

    const listaCaracteristicas =
        document.getElementById("lista-caracteristicas");


    /*=== Actualizar información ===*/
    elementoNombre.textContent =
        producto.nombre;

    imagen.src =
        producto.imagen;

    imagen.alt =
        producto.nombre;

    categoria.textContent =
        producto.categoria;

    descripcion.textContent =
        producto.descripcion;

    precio.textContent =
        producto.precio;


    /*=== Actualizar características ===*/
    listaCaracteristicas.innerHTML = "";

    producto.caracteristicas.forEach(caracteristica => {

        const elemento =
            document.createElement("li");

        elemento.textContent =
            caracteristica;

        listaCaracteristicas.appendChild(elemento);

    });


    /*=== Actualizar título de la página ===*/
    document.title =
        `${producto.nombre} - SonidoVivo`;
}



/*
=== INFORMACIÓN ADICIONAL ===
*/
function configurarInformacionAdicional() {

    const boton =
        document.getElementById("btn-informacion");

    const informacion =
        document.getElementById("informacion-adicional");


    if (!boton || !informacion) {
        return;
    }


    boton.addEventListener("click", () => {

        if (informacion.hidden) {

            informacion.hidden = false;

            boton.textContent =
                "OCULTAR INFORMACIÓN ADICIONAL";

        } else {

            informacion.hidden = true;

            boton.textContent =
                "MOSTRAR INFORMACIÓN ADICIONAL";

        }

    });

}


/*
=== AGREGAR AL CARRO ===
*/
function configurarCarro() {

    const boton =
        document.getElementById("btn-agregar");

    const cantidad =
        document.getElementById("cantidad");


    if (!boton || !cantidad) {
        return;
    }


    boton.addEventListener("click", () => {

        const cantidadSeleccionada =
            parseInt(cantidad.value);


        if (
            isNaN(cantidadSeleccionada) ||
            cantidadSeleccionada < 1
        ) {

            alert("Ingresa una cantidad válida.");

            return;
        }


        const nombreProducto =
            document.getElementById("producto-nombre")
                .textContent;


        boton.textContent =
            "¡AGREGADO AL CARRO!";


        alert(
            `${cantidadSeleccionada} unidad(es) de ${nombreProducto} fueron agregadas al carro.`
        );


        setTimeout(() => {

            boton.textContent =
                "AGREGAR AL CARRO";

        }, 2000);

    });

}


/*
=== INICIALIZACIÓN ===
*/
document.addEventListener("DOMContentLoaded", () => {

    cargarProducto();

    configurarInformacionAdicional();

    configurarCarro();

});
