import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../core/models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { CrudColumn } from '../../core/models/crud-column';
import { CrudTable } from '../../shared/components/crud-table/crud-table';
import { Categoria } from '../../core/models/categoria';
import { CategoriaService } from '../../core/services/categoria.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario';
import { VentaService } from '../../core/services/venta.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, CrudTable],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {

  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  private usuarioService = inject(UsuarioService);
  private ventaService = inject(VentaService);
  private toast = inject(ToastService);

  @ViewChild('detalleVentaSection') detalleVentaRef!: ElementRef;

  productos: Producto[] = [];
  tabActiva: 'productos' | 'categorias' | 'usuarios' | 'ventas' = 'productos';

  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];

  ventas: any[] = [];

  ventaSeleccionada: any = null;


  detalleVenta: any[] = [];

  productoColumns: CrudColumn[] = [
    {
      field: 'nombre',
      label: 'Nombre',
      type: 'text'
    },
    {
      field: 'descripcion',
      label: 'Descripción',
      type: 'text'
    },
    {
      field: 'precio',
      label: 'Precio',
      type: 'number'
    },
    {
      field: 'stock',
      label: 'Stock',
      type: 'number'
    },
    {
      field: 'categoria_id',
      label: 'Categoría',
      type: 'select',
      selectKey: 'categorias'
    },
    {
      field: 'imagen_url',
      label: 'URL Imagen',
      type: 'text'
    }
  ];

  usuarioColumns: CrudColumn[] = [
    {
      field: 'nombre',
      label: 'Nombre',
      type: 'text'
    },
    {
      field: 'apellido',
      label: 'Apellido',
      type: 'text'
    },
    {
      field: 'email',
      label: 'Correo',
      type: 'text'
    },
    {
      field: 'password',
      label: 'Contraseña',
      type: 'text'
    },
    {
      field: 'rol',
      label: 'Rol',
      type: 'select',
      selectKey: 'roles'
    }
  ];

  categoriaColumns: CrudColumn[] = [
    {
      field: 'nombre',
      label: 'Nombre',
      type: 'text'
    },
    {
      field: 'descripcion',
      label: 'Descripción',
      type: 'text'
    }
  ];

  ventaColumns: CrudColumn[] = [
  {
    field: 'id',
    label: 'ID',
    type: 'number'
  },
  {
    field: 'cliente',
    label: 'Cliente',
    type: 'text'
  },
  {
    field: 'fecha_venta',
    label: 'Fecha',
    type: 'text'
  },
  {
    field: 'total',
    label: 'Total',
    type: 'number'
  },
  {
    field: 'estado',
    label: 'Estado',
    type: 'text'
  }
];

  roles = [
    { id: 'ADMIN', nombre: 'Administrador' },
    { id: 'CLIENTE', nombre: 'Cliente' }
  ];

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
    this.cargarUsuarios();
    this.cargarVentas();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => { this.productos = data; },
      error: () => this.toast.error('Error al cargar productos.')
    });
  }

  actualizarProducto(producto: any): void {
    this.productoService.updateProducto(producto.id, producto).subscribe({
      next: () => { this.toast.success('Producto actualizado correctamente.'); this.cargarProductos(); },
      error: () => this.toast.error('Error al actualizar el producto.')
    });
  }

  crearProducto(producto: any): void {
    this.productoService.createProducto(producto).subscribe({
      next: () => { this.toast.success('Producto creado correctamente.'); this.cargarProductos(); },
      error: () => this.toast.error('Error al crear el producto.')
    });
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Deseas eliminar este producto?')) return;
    this.productoService.deleteProducto(id).subscribe({
      next: () => { this.toast.success('Producto eliminado.'); this.cargarProductos(); },
      error: () => this.toast.error('Error al eliminar el producto.')
    });
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => { this.categorias = data; },
      error: () => this.toast.error('Error al cargar categorías.')
    });
  }

  cambiarTab(tab: 'productos' | 'categorias' | 'usuarios' | 'ventas'): void {
    this.tabActiva = tab;
  }

  crearCategoria(categoria: any): void {
    this.categoriaService.createCategoria(categoria).subscribe({
      next: () => { this.toast.success('Categoría creada correctamente.'); this.cargarCategorias(); },
      error: () => this.toast.error('Error al crear la categoría.')
    });
  }

  actualizarCategoria(categoria: any): void {
    this.categoriaService.updateCategoria(categoria.id, categoria).subscribe({
      next: () => { this.toast.success('Categoría actualizada correctamente.'); this.cargarCategorias(); },
      error: () => this.toast.error('Error al actualizar la categoría.')
    });
  }

  eliminarCategoria(id: number): void {
    if (!confirm('¿Deseas eliminar esta categoría?')) return;
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => { this.toast.success('Categoría eliminada.'); this.cargarCategorias(); },
      error: () => this.toast.error('Error al eliminar la categoría.')
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => { this.usuarios = data; },
      error: () => this.toast.error('Error al cargar usuarios.')
    });
  }

  crearUsuario(usuario: any): void {
    this.usuarioService.createUsuario(usuario).subscribe({
      next: () => { this.toast.success('Usuario creado correctamente.'); this.cargarUsuarios(); },
      error: () => this.toast.error('Error al crear el usuario.')
    });
  }

  actualizarUsuario(usuario: any): void {
    this.usuarioService.updateUsuario(usuario.id, usuario).subscribe({
      next: () => { this.toast.success('Usuario actualizado correctamente.'); this.cargarUsuarios(); },
      error: () => this.toast.error('Error al actualizar el usuario.')
    });
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Deseas eliminar este usuario?')) return;
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => { this.toast.success('Usuario eliminado.'); this.cargarUsuarios(); },
      error: () => this.toast.error('Error al eliminar el usuario.')
    });
  }

  cargarVentas(): void {
    this.ventaService.getVentas().subscribe({
      next: (data) => { this.ventas = data; },
      error: () => this.toast.error('Error al cargar ventas.')
    });
  }

  cerrarDetalle(): void {
    this.ventaSeleccionada = null;
    this.detalleVenta = [];
  }

  verDetalleVenta(id: number): void {
    this.ventaService.getVentaById(id).subscribe({
      next: (data) => {
        this.ventaSeleccionada = data.venta ?? data;
        this.detalleVenta = data.detalles ?? data.productos ?? [];
        setTimeout(() => {
          this.detalleVentaRef?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
        });
      },
      error: () => this.toast.error('Error al cargar el detalle de la venta.')
    });
  }
}