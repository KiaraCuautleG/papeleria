export interface CrudColumn {
  field: string;
  label: string;
  type?: 'text' | 'number' | 'select';
  editable?: boolean;
  selectKey?: string;
}