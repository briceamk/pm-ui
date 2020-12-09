import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';
import {AuthGuard} from '@module/auth/guards';
import {AddressImageGuard} from '@module/organization/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'departments'
  },
  {
    path: 'departments',
    component: fromContainers.DepartmentTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departments/new',
    component: fromContainers.DepartmentFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departments/details/:departmentId',
    component: fromContainers.DepartmentFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cost-centers',
    component: fromContainers.CostCenterTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cost-centers/new',
    component: fromContainers.CostCenterFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cost-centers/details/:costCenterId',
    component: fromContainers.CostCenterFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'charges',
    component: fromContainers.ChargeTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'charges/new',
    component: fromContainers.ChargeFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'charges/details/:chargeId',
    component: fromContainers.ChargeFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workflows',
    component: fromContainers.WorkflowTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workflows/new',
    component: fromContainers.WorkflowFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'workflows/details/:workflowId',
    component: fromContainers.WorkflowFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    component: fromContainers.RoleTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles/new',
    component: fromContainers.RoleFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles/details/:roleId',
    component: fromContainers.RoleFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addresses',
    component: fromContainers.AddressTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addresses/new',
    component: fromContainers.AddressFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addresses/details/:addressId',
    component: fromContainers.AddressFormViewComponent,
    canActivate: [AuthGuard, AddressImageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
