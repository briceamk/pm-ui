import { AuthGuard } from '@module/auth/guards/auth.guard';
import {UserGuard} from '@module/auth/guards/user.guard';
import {RoleGuard} from '@module/auth/guards/role.guard';

export const guards: any[] = [AuthGuard, RoleGuard, UserGuard];

export * from '@module/auth/guards/auth.guard';
export * from '@module/auth/guards/role.guard';
export * from '@module/auth/guards/user.guard';
