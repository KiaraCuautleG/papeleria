import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/productos';

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  createProducto(producto: any): Observable<any> {
  return this.http.post(this.apiUrl, producto);
}

updateProducto(id: number, producto: any): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    producto
  );
}

deleteProducto(id: number): Observable<any> {
  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}
}