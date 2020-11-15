import { SignInComponent } from '@module/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '@module/auth/components/sign-up/sign-up.component';
import {UserFormComponent} from '@module/auth/components/user-form/user-form.component';
import {UserTreeComponent} from '@module/auth/components/user-tree/user-tree.component';

export const components: any[] = [
  SignInComponent,
  SignUpComponent,
  UserFormComponent,
  UserTreeComponent
];

export * from  '@module/auth/components/sign-in/sign-in.component';
export * from '@module/auth/components/sign-up/sign-up.component';
export * from '@module/auth/components/user-form/user-form.component';
export * from '@module/auth/components/user-tree/user-tree.component';
