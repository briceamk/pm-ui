import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobInfoFormViewComponent, JobInfoTreeViewComponent} from '@module/cron/containers';
import {AuthGuard} from '@module/auth/guards';
import {JobInfoGuard} from '@module/cron/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'job-infos',
    pathMatch: 'full'
  },
  {
    path: 'job-infos',
    component: JobInfoTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job-infos/new',
    component: JobInfoFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job-infos/details/:jobInfoId',
    component: JobInfoFormViewComponent,
    canActivate: [AuthGuard, JobInfoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CronRoutingModule { }
