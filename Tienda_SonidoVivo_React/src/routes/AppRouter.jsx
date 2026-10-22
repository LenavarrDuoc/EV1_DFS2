import { Routes, Route } from 'react-router-dom';
import { RutaProtegida } from './RutaProtegida';

import HomeView  from '../views/HomeView';
import LoginView from '../views/LoginView';
import ProductoDetalleView from '../views/ProductoDetalleView';
import ProductosView from '../views/ProductosView';
import RegistroView  from '../views/RegistroView';

const             HomeView = () => <h1>Vista: Inicio</h1>;
const            LoginView = () => <h1>Vista: Login</h1>;
const         RegistroView = () => <h1>Vista: Registro</h1>;
const           PerfilView = () => <h1>Vista: Mi Perfil</h1>;
const            AdminView = () => <h1>Vista: Panel de Administración</h1>;

const        ProductosView = () => <h1>Vista: Catálogo de Productos</h1>;
const  ProductoDetalleView = () => <h1>Vista: Detalle de Producto</h1>;
const          CarritoView = () => <h1>Vista: Carrito de Compras</h1>;

const         NotFoundView = () => <h1>Error 404: Página no encontrada</h1>;

export const AppRouter = () => {

    return (
        <Routes>

            <Route path="/"              element={<HomeView/>}             />
            <Route path="/login"         element={<LoginView/>}            />
            <Route path="/registro"      element={<RegistroView/>}         />
            <Route path="/perfil"        element={<PerfilView/>}           />
            <Route path="/productos"     element={<ProductosView/>}        />
            <Route path="/producto/:id"  element={<ProductoDetalleView/>}  />
            <Route path="/carrito"       element={<CarritoView/>}          />
      
            {/* Ruta Protegida */}
            <Route 
                path="/admin" 
                element={
                <RutaProtegida>
                    <AdminView/>
                </RutaProtegida>
                } 
            />

            {/* Error 404 */}
            <Route path="*" element={<NotFoundView/>} />

        </Routes>
    );

};