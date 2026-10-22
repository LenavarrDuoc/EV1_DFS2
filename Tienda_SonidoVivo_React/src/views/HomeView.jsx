import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import GaleriaProductosDestacados from '../components/organisms/GaleriaProductosDestacados'

import imagen_presentacion from '../assets/img/imagen_presentacion.png'
import tienda from '../assets/img/tienda.png'

import {itemsFooter} from '../data/footer'
import {itemsProductosDestacados} from '../data/productos'

function Home() {
    return (
        <>
            <Header/>

                        <main>

                {/*== PRESENTACIÓN ==*/}
                <section id="presentacion">

                    <div className="presentacion-texto">

                        <h2>Tu pasión por la música comienza aquí</h2>

                        <p>
                            Bienvenido a Sonido Vivo, tu tienda especializada
                            en instrumentos y productos relacionados con la música.
                        </p>

                        <a href="productos.html" className="boton">
                            VER CATÁLOGO
                        </a>

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
                <GaleriaProductosDestacados
                    children = {itemsProductosDestacados}
                />


                {/*== VIDEO ==*/}
                <section id="video">

                    <h2>Conoce Sonido Vivo</h2>

                    <p>
                        Descubre nuestra tienda y el mundo de la música.
                    </p>

                    <div className="video-container">
                        {/* YOUTUBE */}
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/KYK1lILuPGY?si=Si-AwArQShqo5yhc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullscreen></iframe>
                    </div>

                </section>

            </main>

            <Footer
                itemsFooter={itemsFooter}
            />
        </>
    )
}

export default Home