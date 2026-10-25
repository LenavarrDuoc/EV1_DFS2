import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import RutaProtegida from './RutaProtegida';

import HomeView  from '../views/HomeView';
import LoginView from '../views/LoginView';
import ProductoDetalleView from '../views/ProductoDetalleView';
import ProductosView from '../views/ProductosView';
import NosotrosView from '../views/NosotrosView';
import RegistroView  from '../views/RegistroView';
import CarritoView from '../views/CarritoView';
import PerfilView from '../views/PerfilView';
import AdminDashboardView from '../views/AdminDashboardView';
import NotFoundView from '../views/NotFoundView';

/* Se reemplaza por NotFoundTemplate: */
/* const  NotFoundView = () => <h1>Error 404: Página no encontrada</h1>; */

export const AppRouter = () => {

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/"              element={<HomeView/>}             />
                <Route path="/login"         element={<LoginView/>}            />
                <Route path="/registro"      element={<RegistroView/>}         />
                <Route path="/perfil"        element={<PerfilView/>}           />
                <Route path="/nosotros"      element={<NosotrosView/>}         />
                <Route path="/productos"     element={<ProductosView/>}        />
                <Route path="/producto/:id"  element={<ProductoDetalleView/>}  />
                <Route path="/carrito"       element={<CarritoView/>}          />
        
                {/* Ruta Protegida */}
                <Route 
                    path="/admin" 
                    element={
                    <RutaProtegida requireAdmin={true}>
                        <AdminDashboardView/>
                    </RutaProtegida>
                    } 
                />

                {/* Error 404 */}
                <Route path="*" element={<NotFoundView/>} />
            </Route>
        </Routes>
    );

};