// src/views/AdminDashboardView.jsx
import { useState, useEffect } from 'react';
//import { itemsProductos as productosIniciales } from '../data/productosData'; //Reemplazado por ProductoService.
import ProductoService from '../services/ProductoService';

function AdminDashboardView() {
    // Cargar catálogo desde localStorage o desde la lista inicial
    /*const [productos, setProductos] = useState(() => {
        const guardados = localStorage.getItem('productos_sonidovivo');
        return guardados ? JSON.parse(guardados) : productosIniciales;
    });*/ // Reemplazado por la carga desde el backend con ProductoService.

    const [productos, setProductos] = useState([]); // Inicia vacío en vez de mapearle la lista localStorage como arriba.
    const [categorias, setCategorias] = useState([]); // Categorías reales desde GET /api/v1/categorias-productos
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [archivoImagen, setArchivoImagen] = useState(null); // Archivo seleccionado para subir a MinIO (Paso 2)

    // Estado para el ajuste parcial de stock (PATCH /{id}/stock -> ProductoStockUpdateDTO)
    const [modalStock, setModalStock] = useState({ visible: false, productoId: null, operacion: 'INGRESO', cantidad: 1 });
        
    // Ajustado exactamente a ProductoInputDTO y ProductoUpdateDTO:
    // nombre, descripcion, caracteristicas (List<String>), precio (Integer), stock (Integer), activo (Boolean), idCategoriaProducto (Integer)
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        caracteristicas: '',
        precio: '',
        stock: '', 
        activo: true,
        idCategoriaProducto: 1
    });

    const cargarProductos = () => {
        ProductoService.getAllProductos()
            .then(res => setProductos(res.data))
            .catch(err => console.error("Error al cargar productos", err));
    };

    useEffect(() => {
        cargarProductos();
        ProductoService.getAllCategorias()
            .then(res => setCategorias(res.data))
            .catch(err => console.error("Error al cargar categorías", err));
    }, []);

    /*const [formData, setFormData] = useState({ //Antiguo formato sin ajustes a DTOs de API REST.
        nombre: '',
        categoria: 'Guitarras',
        precio: '',
        imagen: '',
        descripcion: '',
        caracteristicas: ''
    });*/

    // Guardar siempre cambios en localStorage // Esto ya no es necesario, porque ahora se hace un POST/PUT al backend para guardar los cambios.
    /*useEffect(() => {
        localStorage.setItem('productos_sonidovivo', JSON.stringify(productos));
    }, [productos]);*/

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNuevoProducto = () => {
        setProductoEditar(null);
        setArchivoImagen(null);
        setFormData({
            nombre: '',
            descripcion: '',
            caracteristicas: '',
            precio: '',
            stock: '',
            activo: true,
            // CategoriaProductoResponseDTO devuelve idCategoriaProd
            idCategoriaProducto: categorias.length > 0 ? categorias[0].idCategoriaProd : 1
        });
        setMostrarFormulario(true);
    };

    const handleEditarClick = (prod) => {
        setProductoEditar(prod.id);
        setArchivoImagen(null);

        // Buscamos el ID de la categoría comparando nombreCategoriaProd con prod.categoriaProducto
        const catEncontrada = categorias.find(c => c.nombreCategoriaProd === prod.categoriaProducto);

        setFormData({
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            caracteristicas: Array.isArray(prod.caracteristicas) ? prod.caracteristicas.join(', ') : '',
            precio: prod.precio, // Integer
            stock: prod.stock,   // ProductoUpdateDTO exige @NotNull en stock
            activo: prod.activo === 'Disponible' || prod.activo === true, // ProductoResponseDTO devuelve "Disponible" o "No disponible"
            idCategoriaProducto: catEncontrada ? catEncontrada.idCategoriaProd : (categorias[0]?.idCategoriaProd || 1)
        });
        setMostrarFormulario(true);
    };

    /*const handleEliminarClick = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto del catálogo?")) {
            setProductos(prev => prev.filter(p => p.id !== id));
        }
    };*/ //Reemplazado por la nueva función abajo:

    const handleEliminarClick = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto de la base de datos?")) {
            ProductoService.deleteProducto(id)
                .then(() => cargarProductos())
                .catch(err => console.error(err));
        }
    };

    // Flujo en 2 pasos:
    // Paso 1: POST /api/v1/productos (ProductoInputDTO) o PUT /api/v1/productos/{id} (ProductoUpdateDTO)
    // Paso 2: POST /api/v1/productos/{id}/imagen (multipart/form-data) si se seleccionó archivo
    const handleSubmit = async (e) => {
        e.preventDefault();

        // @NotEmpty exige al menos 1 característica en el arreglo
        const caracteristicasArray = formData.caracteristicas
            ? formData.caracteristicas.split(',').map(c => c.trim()).filter(Boolean)
            : [];

        if (caracteristicasArray.length === 0) {
            alert("Debes ingresar al menos una característica (separadas por coma).");
            return;
        }

        // Payload exacto para ProductoInputDTO y ProductoUpdateDTO
        const payload = {
            nombre: formData.nombre.trim(),
            descripcion: formData.descripcion.trim(),
            caracteristicas: caracteristicasArray,
            precio: parseInt(formData.precio, 10),
            stock: parseInt(formData.stock, 10),
            activo: Boolean(formData.activo),
            idCategoriaProducto: parseInt(formData.idCategoriaProducto, 10)
        };

        try {
            let productoGuardado;

            if (productoEditar) {
                // Conservar la imagenUri actual en el PUT para que no se borre si no se sube una nueva
                const prodActual = productos.find(p => p.id === productoEditar);
                const payloadUpdate = {
                    ...payload,
                    imagenUri: prodActual?.imagenUri || null
                };
                const res = await ProductoService.updateProducto(productoEditar, payloadUpdate);
                productoGuardado = res.data;
            } else {
                const res = await ProductoService.createProducto(payload);
                productoGuardado = res.data;
            }

            // Paso 2: Subir archivo físico a MinIO si el admin seleccionó una imagen
            if (archivoImagen && productoGuardado?.id) {
                await ProductoService.uploadImagen(productoGuardado.id, archivoImagen);
            }

            alert(productoEditar ? "Producto actualizado correctamente" : "Producto creado exitosamente");
            setArchivoImagen(null);
            cargarProductos();
            setMostrarFormulario(false);
        } catch (err) {
            console.error("Error guardando producto:", err.response?.data || err);
            alert("Error al guardar el producto. Revisa que los datos sean válidos y que tengas sesión de admin.");
        }
    };

    // --- LÓGICA PARA EL STOCK (PATCH /api/v1/productos/{id}/stock -> ProductoStockUpdateDTO) ---
    const handleAjustarStock = (e) => {
        e.preventDefault();

        const cantidadAbsoluta = Math.abs(parseInt(modalStock.cantidad, 10));
        // ProductoStockUpdateDTO espera { cantidadAjuste: Integer } (positivo para sumar, negativo para descontar)
        const payloadStock = {
            cantidadAjuste: modalStock.operacion === 'INGRESO' ? cantidadAbsoluta : -cantidadAbsoluta
        };

        ProductoService.updateStock(modalStock.productoId, payloadStock)
            .then(() => {
                alert("Inventario ajustado correctamente");
                setModalStock({ visible: false, productoId: null, operacion: 'INGRESO', cantidad: 1 });
                cargarProductos();
            })
            .catch(err => {
                console.error("Error ajustando stock:", err.response?.data || err);
                alert("No se pudo ajustar el stock (verifica que el stock resultante no sea negativo).");
            });
    };

    return (
        <main>
            <section id="admin-dashboard">
                <div className="admin-encabezado">
                    <h2>Panel de Administración de Productos</h2>
                    {!mostrarFormulario && (
                        <button type="button" className="btn-guardar" onClick={handleNuevoProducto}>
                            + AGREGAR PRODUCTO
                        </button>
                    )}
                </div>

                {/* Formulario Principal (Crear/Editar) */}
                {mostrarFormulario && (
                    <div className="admin-form-container">
                        <h3>{productoEditar ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-grid">
                                <div className="admin-form-field">
                                    <label>Nombre del Producto (3 a 100 caracteres):</label>
                                    <input type="text" name="nombre" minLength="3" maxLength="100" required value={formData.nombre} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field">
                                    <label>Categoría:</label>
                                    {/* Mapeado con CategoriaProductoResponseDTO: idCategoriaProd y nombreCategoriaProd */}
                                    <select name="idCategoriaProducto" value={formData.idCategoriaProducto} onChange={handleChange}>
                                        {categorias.map(cat => (
                                            <option key={cat.idCategoriaProd} value={cat.idCategoriaProd}>
                                                {cat.nombreCategoriaProd}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="admin-form-field">
                                    <label>Precio CLP (Entero, sin $ ni puntos):</label>
                                    <input type="number" min="1" step="1" name="precio" required placeholder="199990" value={formData.precio} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field">
                                    <label>Stock:</label>
                                    <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field">
                                    <label>Imagen del Producto (JPG, PNG, WEBP):</label>
                                    <input 
                                        type="file" 
                                        accept="image/jpeg,image/png,image/webp" 
                                        onChange={(e) => setArchivoImagen(e.target.files[0])} 
                                    />
                                </div>

                                <div className="admin-form-field">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                                        <input 
                                            type="checkbox" 
                                            name="activo" 
                                            checked={formData.activo} 
                                            onChange={handleChange} 
                                        />
                                        Producto Disponible / Activo
                                    </label>
                                </div>

                                <div className="admin-form-field full-width">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" rows="3" required value={formData.descripcion} onChange={handleChange} />
                                </div>

                                <div className="admin-form-field full-width">
                                    <label>Características (obligatorio, separadas por comas):</label>
                                    <input 
                                        type="text" 
                                        name="caracteristicas" 
                                        required 
                                        placeholder="Cuerpo de aliso, Mástil de arce, 22 trastes" 
                                        value={formData.caracteristicas} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="admin-form-actions">
                                    <button type="button" className="btn-cancelar" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                                    <button type="submit" className="btn-guardar">{productoEditar ? 'Guardar Cambios' : 'Crear Producto'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Modal de Stock (PATCH) */}
                {modalStock.visible && (
                    <div className="admin-modal-overlay" style={{ border: '2px solid red', padding: '20px', margin: '20px 0' }}>
                        <h3>Ajustar Inventario</h3>
                        <form onSubmit={handleAjustarStock}>
                            <label>Operación:</label>
                            <select value={modalStock.operacion} onChange={(e) => setModalStock({...modalStock, operacion: e.target.value})}>
                                <option value="INGRESO">Entrada (+)</option>
                                <option value="EGRESO">Salida (-)</option>
                            </select>

                            <label>Cantidad:</label>
                            <input type="number" required min="1" value={modalStock.cantidad} onChange={(e) => setModalStock({...modalStock, cantidad: e.target.value})} />

                            <button type="submit">Confirmar Ajuste</button>
                            <button type="button" onClick={() => setModalStock({...modalStock, visible: false})}>Cancelar</button>
                        </form>
                    </div>
                )}

                <div className="admin-tabla-container">
                    <table className="tabla-productos">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(prod => (
                                <tr key={prod.id}>
                                    <td>
                                        <img 
                                            src={prod.imagenUri || '/placeholder-instrumento.png'} 
                                            alt={prod.nombre} 
                                            className="tabla-img" 
                                        />
                                    </td>
                                    <td><strong>{prod.nombre}</strong></td>
                                    <td>{prod.categoriaProducto || 'Sin Cat'}</td> 
                                    <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                                    <td>{prod.stock}</td>
                                    <td>{prod.activo}</td>
                                    <td>
                                        <div className="acciones-cell">
                                            <button type="button" className="btn-editar" onClick={() => handleEditarClick(prod)}>Editar Datos</button>
                                            <button type="button" style={{backgroundColor: '#17a2b8', color: 'white'}} onClick={() => setModalStock({ visible: true, productoId: prod.id, operacion: 'INGRESO', cantidad: 1 })}>
                                                Ajustar Stock
                                            </button>
                                            <button type="button" className="btn-borrar" onClick={() => handleEliminarClick(prod.id)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default AdminDashboardView;