import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudColumn } from '../../../core/models/crud-column';
import { LucideSearch, LucidePlus, LucidePencil, LucideTrash2, LucideSave, LucideX, LucideEye } from '@lucide/angular';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideSearch, LucidePlus, LucidePencil, LucideTrash2, LucideSave, LucideX, LucideEye
  ],
  templateUrl: './crud-table.html',
  styleUrl: './crud-table.scss',
})
export class CrudTable {
  searchTerm = '';
  @Input() columns: CrudColumn[] = [];

  @Input() data: any[] = [];

  @Input() selectOptions: {
    [key: string]: any[];
  } = {};

  @Input() allowCreate = true;
  @Input() allowEdit = true;
  @Input() allowDelete = true;

  @Output() update = new EventEmitter<any>();

  @Output() create = new EventEmitter<any>();

  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();

  editingId: number | null = null;

  creating = false;

  newRow: any = {};

  editar(id: number) {
    this.editingId = id;
  }

  guardar(item: any) {
    this.editingId = null;
    this.update.emit(item);
  }

  eliminar(id: number) {
    this.delete.emit(id);
  }

  nuevaFila() {
    this.creating = true;
    this.newRow = {};
  }

  crear() {
    this.creating = false;
    this.create.emit(this.newRow);
    this.newRow = {};
  }

  cancelar() {
    this.creating = false;
    this.editingId = null;
    this.newRow = {};
  }

  getDisplayValue(column: CrudColumn, item: any): string {
    if (column.type === 'select') {
      const options = this.selectOptions[column.selectKey || ''] || [];
      const found = options.find((o: any) => o.id === item[column.field]);
      return found?.nombre || '';
    }
    return item[column.field];
  }
  verDetalle(id: number) {
    this.view.emit(id);
  }

  get filteredData(): any[] {

  if (!this.searchTerm.trim()) {
    return this.data;
  }

  const search = this.searchTerm.toLowerCase();

  return this.data.filter(item => {

    return this.columns.some(column => {

      const value = item[column.field];

      return value !== null &&
             value !== undefined &&
             value.toString().toLowerCase().includes(search);

    });

  });

}
}
