import { AuthService } from '@module/auth/services/auth.service';
import {UserService} from '@module/auth/services/user.service';
import {RoleService} from '@module/auth/services/role.service';

export const services: any[] = [
  AuthService,
  RoleService,
  UserService
];

export * from '@module/auth/services/auth.service';
export * from '@module/auth/services/role.service';
export * from '@module/auth/services/user.service';
