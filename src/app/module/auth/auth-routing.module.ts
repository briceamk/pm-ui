import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from '@module/auth/containers';
import {AuthGuard, RoleGuard, UserGuard} from '@module/auth/guards';

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
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'users/details/:userId',
    component: fromContainers.UserFormViewComponent,
    canActivate: [AuthGuard, UserGuard, RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
