import {DialogButtonConfig} from '@share/models/dialog-button-config';

export interface DialogConfig {
  title: string;
  message?: string;
  iconName?: string;
  color?: 'primary' | 'accent' | 'warn';
  disableClose: boolean;
  buttons: DialogButtonConfig[];

}
