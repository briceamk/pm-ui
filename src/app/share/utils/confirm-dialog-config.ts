import {ConfirmConfig} from 'ngx-mat-alert-confirm';
import {ConfirmButtonConfig} from 'ngx-mat-alert-confirm/lib/ngx-mat-alert-confirm.service';

const okButton: ConfirmButtonConfig = {
  id: '1',
  text: 'OK',
  color: 'primary',
  type: 'fab',
  icon: 'check'
}

const cancelButton: ConfirmButtonConfig = {
  id: '0',
  text: 'CANCEL',
  color: 'warn', // 'primary' | 'accent' | 'warn'
  type: 'fab',  //'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'minifab'
  icon: 'clear'
}

const buttonArr: Array <ConfirmButtonConfig> = [okButton, cancelButton];

export let confirmConfig: ConfirmConfig = {
  title: 'Etes vous sûre?',
  titleSize: 28,
  message: 'This action cannot be reversed!',
  messageSize: 16,
  matIcon: 'access_alarm',
  iconAnimation: undefined,
  iconColor: 'primary',
  buttons: buttonArr,
  disableClose: true, // true | false
  autoFocus: true, // true | false
  restoreFocus: true,
  width: undefined
};


