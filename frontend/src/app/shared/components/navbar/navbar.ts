import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { CarritoService } from '../../../core/services/carrito.service';
import { AuthService } from '../../../core/services/authService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {

  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  get cantidadProductos(): number {
    return this.carritoService.getCantidadProductos();
  }
  get usuario() {
    return this.authService.getUsuario();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}