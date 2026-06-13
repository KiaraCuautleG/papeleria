import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    ).pipe(
      tap(usuario => {
        localStorage.setItem(
          'usuario',
          JSON.stringify(usuario)
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  getUsuario(): any {
    const usuario =
      localStorage.getItem('usuario');

    return usuario
      ? JSON.parse(usuario)
      : null;
  }

  isLoggedIn(): boolean {
    return this.getUsuario() !== null;
  }

  isAdmin(): boolean {
    return this.getUsuario()?.rol === 'ADMIN';
  }
}