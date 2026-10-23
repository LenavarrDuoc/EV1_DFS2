# Tienda Sonido Vivo
## Caso semestral: E-commerce, Tienda Sonido Vivo

Sonido Vivo es una tienda especializada en instrumentos musicales, equipos de sonido y accesorios para músicos, ubicada en Viña del Mar, Región de Valparaíso.

El catálogo incluye guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos y accesorios. También ofrece reparación de instrumentos de cuerda. El catálogo actual tiene 340 referencias distintas.

### Evaluacion Parcial 1 - Desarrollo Fullstack II

Este sistema busca mejorar el proceso actual de atención a clientes remotos, consulta de productos, gestión de pedidos y consulta de información relacionada con ventas e inventario.

#### Estructura del proyecto

El proyecto está organizado como una pequeña aplicación web estática para la tienda Sonido Vivo. La base del sistema está compuesta por páginas HTML, estilos CSS y archivos JavaScript que permiten la presentación visual y la interacción básica del sitio.
```text
EV1_DSF2/
├── README.md
└── Tienda_SonidoVivo/
    ├── index.html         # Página principal de inicio y presentación
    ├── productos.html     # Catálogo de productos
    ├── producto.html      # Detalle de un producto específico
    ├── login.html         # Inicio de sesión de usuarios
    ├── registro.html      # Registro de nuevos usuarios
    ├── css/
    │   └── styles.css     # Estilos generales de la interfaz
    ├── img/               # Imágenes del sitio, productos y branding
    └── js/                # Scripts para interacciones y lógica del frontend
```

### Evaluación Parcial 2 - Desarrollo Fullstack II

Migración del proyecto a React-Bootstrap-Vite, incluyendo nuevas pantallas y funcionalidades como: Panel de Control (Admin), Carrito de Compras, Mi Perfil y Error 404.

#### Estructura actual del proyecto

EV2_DSF2/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── public/
└── src/
    ├── App.css                 
    ├── App.jsx                 # Componente raíz con AuthProvider y CartProvider
    ├── main.jsx                # Punto de entrada de la aplicación React
    ├── styles.css              # Hoja de estilos global consolidada (variables CSS)
    ├── assets/                 # Imagenes y videos
    ├── components/
    │   ├── atoms/              # Botón agregar carrito, íconos, botones generales
    │   ├── molecules/          # FormField, PasswordInput, CarritoItem, Filtros
    │   ├── organisms/          # Header, Footer, GaleriaProductos, DetalleProductoCard
    │   ├── templates/          # MainLayout (Sticky Footer y Outlet)
    ├── context/
    │   ├── AuthContext.jsx     # Contexto global de autenticación y roles
    │   └── CartContext.jsx     # Contexto global del carrito de compras
    ├── data/
    │   ├── productos.js        # Dataset inicial de productos del catálogo
    │   └── footer.js           # Enlaces y contenido del pie de página
    ├── models/
    │   └── Usuario.js          # Clase modelo para la estructura de usuarios
    ├── routes/
    │   ├── AppRouter.jsx       # Configuración de rutas estáticas y protegidas
    │   └── RutaProtegida.jsx   # Envoltorio de protección para vistas de administrador
    ├── utils/
    │   └── validaciones.js     # Lógica centralizada de validación y encriptación SHA-256
    └── views/                  # Páginas completas (Home, Productos, Detalle, Carrito,
                                # Registro, Login, Perfil, AdminDashboard)