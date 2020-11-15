import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@module/catalog/containers';
import {AuthGuard} from '@module/auth/guards';
import {CatalogGuard, CategoryGuard, ProductGuard, ProductImageGuard} from '@module/catalog/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: fromContainers.ProductTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/new',
    component: fromContainers.ProductFormViewComponent,
    canActivate: [AuthGuard, CatalogGuard, CategoryGuard]
  },
  {
    path: 'products/details/:productId',
    component: fromContainers.ProductFormViewComponent,
    canActivate: [AuthGuard, ProductGuard, CatalogGuard, CategoryGuard, ProductImageGuard]
  },
  {
    path: 'categories',
    component: fromContainers.CategoryTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/new',
    component: fromContainers.CategoryFormViewComponent,
    canActivate: [AuthGuard, CategoryGuard]
  },
  {
    path: 'categories/details/:categoryId',
    component: fromContainers.CategoryFormViewComponent,
    canActivate: [AuthGuard, CategoryGuard]
  },
  {
    path: 'catalogs',
    component: fromContainers.CatalogTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogs/new',
    component: fromContainers.CatalogFormViewComponent,
    canActivate: [AuthGuard, CatalogGuard]
  },
  {
    path: 'catalogs/details/:catalogId',
    component: fromContainers.CatalogFormViewComponent,
    canActivate: [AuthGuard, CatalogGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
