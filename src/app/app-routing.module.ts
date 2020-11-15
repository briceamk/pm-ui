import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {DefaultComponent} from '@layout/default/default.component';

import {AuthGuard} from '@module/auth/guards/';

import {PageNotFoundComponent} from '@share/components';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: './module/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'auth',
        loadChildren: './module/auth/auth.module#AuthModule'
      },
      {
        path: 'company',
        loadChildren: './module/company/company.module#CompanyModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'catalog',
        loadChildren: './module/catalog/catalog.module#CatalogModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'cron',
        loadChildren: './module/cron/cron.module#CronModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: './module/notification/notification.module#NotificationModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'organization',
        loadChildren: './module/organization/organization.module#OrganizationModule',
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
