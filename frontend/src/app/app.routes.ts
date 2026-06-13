import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos';
import { CarritoComponent } from './pages/carrito/carrito';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Confirmacion } from './pages/confirmacion/confirmacion';

export const routes: Routes = [
    {
        path: '',
        component: ProductosComponent
    },
    {
        path: 'carrito',
        component: CarritoComponent
    },
    {
        path: 'admin',
        component: Admin
    },
    {
        path: 'login',
        component: Login
    },
     { path: 'confirmacion', component: Confirmacion },
];