import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@module/company/containers';
import {AuthGuard} from '@module/auth/guards';
import {CompanyGuard, CompanyImageGuard} from '@module/company/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'companies'
  },
  {
    path: 'companies',
    canActivate: [AuthGuard],
    component: fromContainers.CompanyTreeViewComponent,

  },
  {
    path: 'companies/new',
    canActivate: [AuthGuard],
    component: fromContainers.CompanyFormViewComponent,
  },
  {
    path: 'companies/details/:companyId',
    canActivate: [AuthGuard, CompanyGuard, CompanyImageGuard],
    component: fromContainers.CompanyFormViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
