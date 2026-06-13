import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-20 right-5 z-50 flex flex-col gap-3 pointer-events-none">
      <div
        *ngFor="let toast of toastService.toasts()"
        class="flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-72 max-w-sm pointer-events-auto transition-all duration-300"
        [class.bg-green-50]="toast.type === 'success'"
        [class.text-green-800]="toast.type === 'success'"
        [class.border]="true"
        [class.border-green-200]="toast.type === 'success'"
        [class.bg-red-50]="toast.type === 'error'"
        [class.text-red-800]="toast.type === 'error'"
        [class.border-red-200]="toast.type === 'error'"
        [class.bg-blue-50]="toast.type === 'info'"
        [class.text-blue-800]="toast.type === 'info'"
        [class.border-blue-200]="toast.type === 'info'"
      >
        <span class="text-base leading-none mt-0.5">
          {{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}
        </span>
        <span class="flex-1">{{ toast.message }}</span>
        <button
          (click)="toastService.remove(toast.id)"
          class="opacity-50 hover:opacity-100 text-lg leading-none ml-1"
        >×</button>
      </div>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}
