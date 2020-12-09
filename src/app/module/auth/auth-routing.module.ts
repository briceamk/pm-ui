import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from '@module/auth/containers';
import {AuthGuard, PermissionGuard, UserGuard} from '@module/auth/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in',
    component: fromContainers.SignInContainerComponent
  },
  {
    path: 'sign-up',
    component: fromContainers.SignUpContainerComponent
  },
  {
    path: 'users',
    component: fromContainers.UserTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/new',
    component: fromContainers.UserFormViewComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
  {
    path: 'users/details/:userId',
    component: fromContainers.UserFormViewComponent,
    canActivate: [AuthGuard, UserGuard, PermissionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
