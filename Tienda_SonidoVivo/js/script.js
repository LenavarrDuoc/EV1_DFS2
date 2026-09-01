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

/*==================================================
    PRODUCTOS
==================================================*/

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