import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects }  from '@module/company/store';

//components
import * as fromComponents from '@module/company/components';

//components
import * as fromContainers from '@module/company/containers';

//services
import * as fromServices from '@module/company/services';

//guards
import * as fromGuards from '@module/company/guards';

//module
import { CompanyRoutingModule } from '@module/company/company-routing.module';
import {ShareModule} from '@share/share.module';



@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('company', reducers),
    EffectsModule.forFeature(effects),
    CompanyRoutingModule,
    ShareModule
  ],
  exports: [...fromComponents.components, ...fromContainers.containers],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class CompanyModule {}
