import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@module/notification/containers';
import {AuthGuard} from '@module/auth/guards';
import {MailGuard, MailServerGuard, MailTemplateGuard} from '@module/notification/guards';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'mails',
    pathMatch: 'full'
  },
  {
    path: 'mails',
    component: fromContainers.MailTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mails/new',
    component: fromContainers.MailFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mails/details/:mailId',
    component: fromContainers.MailFormViewComponent,
    canActivate: [AuthGuard, MailGuard]
  },
  {
    path: 'mail-templates',
    component: fromContainers.MailTemplateTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mail-templates/new',
    component: fromContainers.MailTemplateFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mail-templates/details/:mailTemplateId',
    component: fromContainers.MailTemplateFormViewComponent,
    canActivate: [AuthGuard, MailTemplateGuard]
  },
  {
    path: 'mail-servers',
    component: fromContainers.MailServerTreeViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mail-servers/new',
    component: fromContainers.MailServerFormViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mail-servers/details/:mailServerId',
    component: fromContainers.MailServerFormViewComponent,
    canActivate: [AuthGuard, MailServerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
