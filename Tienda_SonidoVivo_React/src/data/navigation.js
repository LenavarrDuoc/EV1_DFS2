/**
 * Configuración centralizada de las rutas principales de navegación.
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

