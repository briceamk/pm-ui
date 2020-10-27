import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = createAction(
  '[Router] Go',
  props<{ path: any[]; query?: object; extras?: NavigationExtras }>(),
);
export const BACK = createAction('[Router] Back');
export const FORWARD = createAction('[Router] Forward');
