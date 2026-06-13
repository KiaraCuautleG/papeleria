import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.scss',
})
export class Confirmacion implements OnInit {
  private router = inject(Router);

  ventaId: number | null = null;
  total: number = 0;
  items: { nombre: string; cantidad: number; subtotal: number }[] = [];
  fecha: string = '';

  ngOnInit(): void {
    const state = history.state;

    if (!state?.ventaId) {
      this.router.navigate(['/']);
      return;
    }

    this.ventaId = state.ventaId;
    this.total = state.total ?? 0;
    this.items = state.items ?? [];
    this.fecha = new Date().toLocaleDateString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}
