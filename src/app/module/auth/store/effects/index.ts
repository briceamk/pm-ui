import { AuthEffects } from '@module/auth/store/effects/auth.effect';
import {UserEffect} from '@module/auth/store/effects/user.effect';
import {RoleEffect} from '@module/auth/store/effects/role.effect';

export const effects: any[] = [AuthEffects, RoleEffect, UserEffect];

export * from '@module/auth/store/effects/auth.effect';
export * from '@module/auth/store/effects/role.effect';
export * from '@module/auth/store/effects/user.effect';
