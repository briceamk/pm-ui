import { SignInContainerComponent } from '@module/auth/containers/sign-in-container/sign-in-container.component';
import { SignUpContainerComponent } from '@module/auth/containers/sign-up-container/sign-up-container.component';
import {UserFormViewComponent} from '@module/auth/containers/user-form-view/user-form-view.component';
import {UserTreeViewComponent} from '@module/auth/containers/user-tree-view/user-tree-view.component';


export const containers: any[] = [
  SignInContainerComponent,
  SignUpContainerComponent,
  UserFormViewComponent,
  UserTreeViewComponent
];

export * from '@module/auth/containers/sign-in-container/sign-in-container.component';
export * from '@module/auth/containers/sign-up-container/sign-up-container.component';
export * from '@module/auth/containers/user-form-view/user-form-view.component';
export * from '@module/auth/containers/user-tree-view/user-tree-view.component';
