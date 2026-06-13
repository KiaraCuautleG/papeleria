import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/categorias';

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  createCategoria(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  updateCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      categoria
    );
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}