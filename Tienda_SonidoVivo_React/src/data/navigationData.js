/**
 * Configuración centralizada de las rutas principales de navegación.
 * Desde aquí, se agrega, modifica o eliminan los enlaces del header y sus rutas.
 * Lo que se modifique aquí se reflejará automáticamente en el header (en parte central y en menú hamburguesa con el off canvas)
 * y en la navegación de la aplicación.
 */
export const NAV_ITEMS = [
    {
        label: 'INICIO',
        path: '/',
        requireAdmin: false,
    },
    {
        label: 'CATÁLOGO',
        path: '/productos',
        requireAdmin: false,
    },
    {
        label: 'OFERTAS',
        path: '/ofertas',
        requireAdmin: false,
    },
    {
        label: 'NOSOTROS',
        path: '/nosotros',
        requireAdmin: false,
    },
    {
        label: 'ADMINISTRACIÓN',
        path: '/admin',
        requireAdmin: true,
    },
];

/**
 * Rutas para usuarios no autenticados (Invitados).
 */
export const GUEST_NAV_ITEMS = [
    {
        label: 'INICIAR SESIÓN',
        path: '/login',
    },
    {
        label: 'REGISTRARSE',
        path: '/registro',
    },
];

