import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/ventas';

  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getVentaById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }

  crearVenta(body: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      body
    );
  }
}