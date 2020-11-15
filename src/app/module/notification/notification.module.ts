import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers, effects} from '@module/notification/store';

import { NotificationRoutingModule } from '@module/notification/notification-routing.module';


//components
import * as fromComponents from '@module/notification/components';

//components
import * as fromContainers from '@module/notification/containers';

//services
import * as fromServices from '@module/notification/services';

//services
import * as fromGuards from '@module/notification/guards';

// module
import {ShareModule} from '@share/share.module';




@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    ShareModule,
    StoreModule.forFeature('notification', reducers),
    EffectsModule.forFeature(effects),
    NotificationRoutingModule
  ],
  exports:  [...fromComponents.components, ...fromContainers.containers],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class NotificationModule { }
