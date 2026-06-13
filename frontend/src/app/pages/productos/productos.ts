import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/models/producto';
import { CarritoService } from '../../core/services/carrito.service';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent implements OnInit {

  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private toast = inject(ToastService);

  productos: Producto[] = [];

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => { this.productos = data; },
      error: () => this.toast.error('Error al cargar los productos.')
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
    this.toast.success(`"${producto.nombre}" agregado al carrito.`);
  }
}