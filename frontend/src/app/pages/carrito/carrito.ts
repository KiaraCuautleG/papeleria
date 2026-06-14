import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { CarritoService } from '../../core/services/carrito.service';
import { Producto } from '../../core/models/producto';
import { VentaService } from '../../core/services/venta.service';
import { CarritoItem } from '../../core/models/carrito-item';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/authService';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class CarritoComponent {

  private carritoService = inject(CarritoService);
  private ventaService = inject(VentaService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private authService = inject(AuthService);

  get productos(): CarritoItem[] {
    return this.carritoService.getCarrito();
  }

  get total(): number {
    return this.carritoService.getTotal();
  }

  finalizarCompra(): void {

  if (this.productos.length === 0) {
    this.toast.info('El carrito está vacío.');
    return;
  }

  const usuario = this.authService.getUsuario();

  if (!usuario) {
    this.toast.info('Debes iniciar sesión para finalizar la compra.');
    this.router.navigate(['/login']);
    return;
  }

  const body = {
    usuario_id: usuario.id,
    productos: this.carritoService.getProductosVenta()
  };

  this.ventaService.crearVenta(body).subscribe({
    next: (response) => {
      const items = this.productos.map(i => ({
        nombre: i.producto.nombre,
        cantidad: i.cantidad,
        subtotal: i.producto.precio * i.cantidad
      }));
      const total = this.total;

      this.carritoService.limpiarCarrito();

      this.router.navigate(['/confirmacion'], {
        state: { ventaId: response.venta_id, total, items }
      });
    },
    error: (error) => {
      this.toast.error(
        error.error?.message ||
        'Ocurrió un error al procesar la compra.'
      );
    }
  });

}

  aumentarCantidad(id: number): void {
    this.carritoService.aumentarCantidad(id);
  }

  disminuirCantidad(id: number): void {
    this.carritoService.disminuirCantidad(id);
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
    this.toast.info('Producto eliminado del carrito.');
  }
}