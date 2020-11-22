export interface DialogButtonConfig {
  result: true | false;
  name?: string;
  type?: 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'minifab';
  color?: 'primary' | 'accent' | 'warn';
  iconName?: string;
}
