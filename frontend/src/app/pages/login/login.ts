import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authService';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { LucideBookOpen, LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideBookOpen, LucideEye, LucideEyeOff],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  email = '';
  password = '';
  showPassword = false;

  iniciarSesion(): void {
    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: () => {
          this.toast.success('Sesión iniciada correctamente.');
          this.router.navigate(['/']);
        },
        error: () => {
          this.toast.error('Correo o contraseña incorrectos.');
        }
      });
  }
}
