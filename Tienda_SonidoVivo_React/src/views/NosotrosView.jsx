import { Link } from 'react-router-dom';
import { VALORES } from '../data/valoresData';
import { ESTADISTICAS } from '../data/estadisticasData';
import { EQUIPO } from '../data/equipoData';

export default function NosotrosView() {
    return (
        <div className="nosotros-view">
            {/* 1. HERO SECTION */}
            <section className="bg-dark text-white py-5 text-center">
                <div className="container py-4">
                    <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase fw-semibold">
                        Sobre Sonido Vivo
                    </span>
                    <h1 className="display-4 fw-bold mb-3">Conectamos a Músicos con su Sonido</h1>
                    <p className="lead mx-auto text-secondary col-lg-8">
                        Desde 2012 nos dedicamos a asesorar y equipar a artistas, bandas y estudios de grabación con el mejor equipamiento musical en Chile.
                    </p>
                </div>
            </section>

            {/* 2. HISTORIA Y PROPÓSITO */}
            <section className="py-5 bg-white">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-4 text-dark">Nuestra Historia</h2>
                            <p className="text-muted fs-5">
                                Nacimos como un pequeño taller y servicio técnico de instrumentos musicales análogos y digitales en las cercanías de Duoc UC, sede Puente Alto. La confianza de la comunidad de músicos nos impulsó a crecer hasta convertirnos en una tienda integral.
                            </p>
                            <p className="text-muted">
                                Creemos que un instrumento no es solo madera y metal, sino una herramienta de expresión. Por eso no solo comercializamos productos: te guiamos para encontrar el tono ideal para tu proyecto.
                            </p>
                            <div className="mt-4">
                                <Link to="/productos" className="btn btn-warning fw-bold rounded-pill px-4 py-2">
                                    EXPLORAR CATÁLOGO
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="p-4 bg-light rounded-4 border shadow-sm text-center">
                                <i className="bi bi-soundwave display-1 text-warning mb-3 d-block"></i>
                                <h3 className="h4 fw-bold mb-2">Compromiso con la Calidad</h3>
                                <p className="text-muted mb-0">
                                    Revisamos minuciosamente la electrónica, trasteo y ajuste de cada guitarra, bajo o equipo de audio antes de ser despachado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CIFRAS / ESTADÍSTICAS */}
            <section className="py-5 bg-dark text-white border-top border-bottom border-secondary border-opacity-25">
                <div className="container">
                    <div className="row g-4 text-center">
                        {ESTADISTICAS.map((stat, idx) => (
                            <div key={idx} className="col-md-4">
                                <div className="p-4 rounded-3 border border-secondary border-opacity-25 bg-secondary bg-opacity-10 h-100 d-flex flex-column justify-content-center">
                                    <h3 className="display-5 fw-bold text-warning mb-1">{stat.cifra}</h3>
                                    <p className="text-light mb-0 fs-5">{stat.etiqueta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. VALORES DE LA MARCA */}
            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Por qué elegir Sonido Vivo</h2>
                        <p className="text-muted">Lo que nos diferencia en el mercado musical</p>
                    </div>

                    <div className="row g-4">
                        {VALORES.map((val, idx) => (
                            <div key={idx} className="col-md-4">
                                <div className="card h-100 shadow-sm p-4 rounded-4 card-glow">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-3 mb-3 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                            <i className={`bi ${val.icono} fs-3`}></i>
                                        </div>
                                        <h3 className="h5 card-title fw-bold mb-3">{val.titulo}</h3>
                                        <p className="card-text text-muted mb-0">{val.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. NUESTRO EQUIPO */}
            <section className="py-5 bg-white">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">El Equipo Detrás del Sonido</h2>
                    <div className="row g-4">
                        {EQUIPO.map((miembro) => (
                            <div key={miembro.id} className="col-md-4">
                                <div className="card border-0 shadow-sm text-center h-100 card-team">
                                    <div className="card-img-wrapper">
                                        <img 
                                            src={miembro.imagen} 
                                            className="card-img-top card-img-zoom" 
                                            alt={`Foto de ${miembro.nombre}`} 
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold mb-1">{miembro.nombre}</h5>
                                        <p className="card-text text-muted small mb-0">{miembro.cargo}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}