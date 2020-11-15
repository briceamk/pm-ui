import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects }  from '@module/cron/store';

//components
import * as fromComponents from '@module/cron/components';

//components
import * as fromContainers from '@module/cron/containers';

//services
import * as fromServices from '@module/cron/services';

//services
import * as fromGuards from '@module/cron/guards';

// module
import {ShareModule} from '../../share/share.module';
import { CronRoutingModule } from './cron-routing.module';

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    ShareModule,
    StoreModule.forFeature('cron', reducers),
    EffectsModule.forFeature(effects),
    CronRoutingModule
  ],
  exports:  [...fromComponents.components, ...fromContainers.containers],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class CronModule { }
