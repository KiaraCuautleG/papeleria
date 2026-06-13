import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { CarritoItem } from '../models/carrito-item';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {
 private carrito: CarritoItem[] = this.cargarCarrito();
  getCarrito(): CarritoItem[] {
    return this.carrito;
  }

  agregarProducto(producto: Producto): void {

    const item = this.carrito.find(
      x => x.producto.id === producto.id
    );

    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({
        producto,
        cantidad: 1
      });
    }
    this.guardarCarrito();
  }

  aumentarCantidad(id: number): void {
    const item = this.carrito.find(
      x => x.producto.id === id
    );

    if (item) {
      item.cantidad++;
      this.guardarCarrito();
    }
  }

  disminuirCantidad(id: number): void {
    const item = this.carrito.find(
      x => x.producto.id === id
    );

    if (!item) return;

    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.carrito = this.carrito.filter(
        x => x.producto.id !== id
      );
    }
    this.guardarCarrito();
  }

  eliminarProducto(id: number): void {
    this.carrito = this.carrito.filter(
      x => x.producto.id !== id
    );
    this.guardarCarrito();
  }

  limpiarCarrito(): void {
    this.carrito = [];
    this.guardarCarrito();
  }

  getTotal(): number {
    return this.carrito.reduce(
      (total, item) =>
        total + (item.producto.precio * item.cantidad),
      0
    );
  }

  getProductosVenta() {
    return this.carrito.map(item => ({
      producto_id: item.producto.id,
      cantidad: item.cantidad
    }));
  }

  getCantidadProductos(): number {
    return this.carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  }
  private guardarCarrito(): void {
  localStorage.setItem(
    'carrito',
    JSON.stringify(this.carrito)
  );
}

private cargarCarrito(): CarritoItem[] {
  const data = localStorage.getItem('carrito');

  if (data) {
    return JSON.parse(data);
  }

  return [];
}
}