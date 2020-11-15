import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ShareModule} from '@share/share.module';
import {DashboardModule} from '@module/dashboard/dashboard.module';
import {AuthModule} from '@module/auth/auth.module';
import {CompanyModule} from '@module/company/company.module';
import {CronModule} from '@module/cron/cron.module';
import {NotificationModule} from '@module/notification/notification.module';
import {CatalogModule} from '@module/catalog/catalog.module';
import {OrganizationModule} from '@module/organization/organization.module';

import {DefaultComponent} from '@layout/default/default.component';



@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    DashboardModule,
    AuthModule.forRoot(),
    CompanyModule,
    CronModule,
    NotificationModule,
    CatalogModule,
    OrganizationModule
  ]
})
export class DefaultModule { }
