import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
// feature module
import {DashboardRoutingModule} from '@module/dashboard/dashboard-routing.module';

// components
import {DashboardComponent} from '@module/dashboard/dashboard.component';

//module
import {ShareModule} from '@share/share.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
