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
        loadChildren: async () => (await import( './module/dashboard/dashboard.module')).DashboardModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'auth',
        loadChildren: async () => (await import( './module/auth/auth.module')).AuthModule,
      },
      {
        path: 'company',
        loadChildren: async () => (await import( './module/company/company.module')).CompanyModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'catalog',
        loadChildren: async () => (await import( './module/catalog/catalog.module')).CatalogModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'cron',
        loadChildren: async () => (await import( './module/cron/cron.module')).CronModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: async () =>  (await import( './module/notification/notification.module')).NotificationModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'organization',
        loadChildren: async () => (await import( './module/organization/organization.module')).OrganizationModule ,
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
