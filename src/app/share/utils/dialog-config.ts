import {DialogButtonConfig, DialogConfig} from '@share/models';

const buttonDialogConfigs: Array<DialogButtonConfig> = [
  {
    result: true,
    name: 'OK',
    type: 'raised',
    color: 'primary',
    iconName: 'check'
  },
  {
    result: false,
    name: 'ANNULER',
    type: 'raised',
    color: 'warn',
    iconName: 'clear'
  }
];
export const dialogConfig: DialogConfig = {
  iconName: 'warning',
  title: 'Attention ',
  disableClose: true,
  buttons: buttonDialogConfigs,

};
