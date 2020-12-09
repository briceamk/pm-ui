import { AuthGuard } from '@module/auth/guards/auth.guard';
import {UserGuard} from '@module/auth/guards/user.guard';
import {PermissionGuard} from '@module/auth/guards/permission.guard';

export const guards: any[] = [AuthGuard, PermissionGuard, UserGuard];

export * from '@module/auth/guards/auth.guard';
export * from '@module/auth/guards/permission.guard';
export * from '@module/auth/guards/user.guard';
