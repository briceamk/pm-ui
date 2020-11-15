import {ThemePalette} from '@angular/material/core';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  color?: ThemePalette,
  authorities?: string[],
  hidden?: boolean,
  children?: NavItem[];
}
