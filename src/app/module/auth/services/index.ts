import { AuthService } from '@module/auth/services/auth.service';
import {UserService} from '@module/auth/services/user.service';
import {PermissionService} from '@module/auth/services/permission.service';

export const services: any[] = [
  AuthService,
  PermissionService,
  UserService
];

export * from '@module/auth/services/auth.service';
export * from '@module/auth/services/permission.service';
export * from '@module/auth/services/user.service';
