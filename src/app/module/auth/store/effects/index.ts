import { AuthEffects } from '@module/auth/store/effects/auth.effect';
import {UserEffect} from '@module/auth/store/effects/user.effect';
import {PermissionEffect} from '@module/auth/store/effects/permission.effect';

export const effects: any[] = [AuthEffects, PermissionEffect, UserEffect];

export * from '@module/auth/store/effects/auth.effect';
export * from '@module/auth/store/effects/permission.effect';
export * from '@module/auth/store/effects/user.effect';
