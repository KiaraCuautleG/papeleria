import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/usuarios';

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      usuario
    );
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}