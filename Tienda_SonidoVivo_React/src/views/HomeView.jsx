import { useState, useEffect } from 'react' // Importados hooks para manejar el estado y la carga asíncrona desde el backend
import { Link } from 'react-router-dom'

import GaleriaProductosDestacados from '../components/organisms/GaleriaProductosDestacados'
import ProductoService from '../services/ProductoService' // Servicio conectado al microservicio ms-productos (acceso público)

import imagen_presentacion from '../assets/img/imagen_presentacion.png'
import tienda from '../assets/img/tienda.png'

// import { itemsProductosDestacados } from '../data/productosData' // Reemplazado por carga dinámica desde el backend

function HomeView() {
    // Estado para almacenar los productos destacados obtenidos desde la API
    const [productosDestacados, setProductosDestacados] = useState([])

    // Carga inicial de productos activos sin requerir autenticación (endpoint público en Traefik)
    useEffect(() => {
        ProductoService.getProductosActivos()
            .then(response => {
                // Seleccionamos los primeros 4 productos activos para mostrarlos como destacados en el Home
                setProductosDestacados(response.data.slice(0, 4))
            })
            .catch(error => {
                console.error("Error al cargar productos destacados:", error)
            })
    }, [])

    return (
        <>
            <main>

                {/*== PRESENTACIÓN ==*/}
                <section id="presentacion">

                    <div className="presentacion-texto">

                        <h2>Tu pasión por la música comienza aquí</h2>

                        <p>
                            Bienvenido a Sonido Vivo, tu tienda especializada
                            en instrumentos y productos relacionados con la música.
                        </p>

                        <Link to="/productos" className="boton">
                            VER CATÁLOGO
                        </Link>

                    </div>

                    <div className="presentacion-imagen">

                        <img
                            src= {imagen_presentacion}
                            alt="Instrumentos musicales"
                        />

                    </div>

                </section>


                {/*== SOBRE NOSOTROS ==*/}
                <section id="sobre-nosotros">

                    <div className="sobre-texto">

                        <h2>Sobre Sonido Vivo</h2>

                        <p>
                            En Sonido Vivo buscamos ofrecer productos relacionados
                            con la música para músicos y personas interesadas
                            en desarrollar su pasión musical.
                        </p>

                        <p>
                            Nuestro catálogo incluye diferentes productos
                            seleccionados para distintas necesidades y estilos.
                        </p>

                    </div>

                    <div className="sobre-imagen">

                        <img
                            src={tienda}
                            alt="Productos disponibles en Sonido Vivo"
                        />

                    </div>

                </section>


                {/*== PRODUCTOS DESTACADOS ==*/}
                {/* Se pasa el estado cargado desde ms-productos en lugar del arreglo estático local */}
                <GaleriaProductosDestacados
                    productos={productosDestacados}
                />


                {/*== VIDEO ==*/}
                <section id="video">

                    <h2>Conoce Sonido Vivo</h2>

                    <p>Descubre nuestra tienda y el mundo de la música.</p>

                    <div className="video-container">

                        {/* YOUTUBE */}
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/KYK1lILuPGY?si=Si-AwArQShqo5yhc"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer;
                            autoplay; clipboard-write;
                            encrypted-media; gyroscope;
                            picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>

                    </div>

                </section>

            </main>
        </>
    )
}

export default HomeView