import { Link } from 'react-router-dom';
import errorGif from '../../assets/img/loading-cat-meme.gif';
import brokenGuitar from '../../assets/img/broken-guitar.png';

export function NotFoundTemplate() {
    return (
        <main 
            className="container min-vh-100 d-flex align-items-center justify-content-center text-center py-5"
            style={{
                // Fondo con imagen y capa semitransparente para legibilidad
                backgroundImage: `url(${brokenGuitar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="row justify-content-center w-100">
                <div className="col-12 col-md-8 col-lg-6">

                    {/* Imagen / GIF sobre el código 404 */}
                    <div className="mb-3">
                        <img 
                            src={errorGif} 
                            alt="Error 404" 
                            className="img-fluid"
                            style={{ maxHeight: '220px', objectFit: 'contain' }}
                        />
                    </div>
                    {/* Código de Error */}
                    <h1 className="display-1 fw-bold text-danger mb-0" style={{ fontSize: '7rem' }}>
                        UPPS! Desafinamos...
                    </h1>

                    {/* Mensaje principal */}
                    <h2 className="h3 fw-semibold mb-3">
                        Página no encontrada
                    </h2>

                    {/* Descripción */}
                    <p className="text-secondary mb-4">
                        Lo sentimos, la página que estás buscando no existe, ha sido movida o cambió de dirección.
                    </p>

                    {/* Acciones */}
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/" className="btn btn-primary btn-lg px-4 shadow-sm">
                            Volver al Inicio
                        </Link>
                        <Link to="/productos" className="btn btn-outline-secondary btn-lg px-4">
                            Ver Catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}