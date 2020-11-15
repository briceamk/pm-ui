import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

// store
import {effects, reducers} from '@module/organization/store';

// third party modules
import {ShareModule} from '@share/share.module';
import { OrganizationRoutingModule } from '@module/organization/organization-routing.module';

// components
import * as fromComponents from '@module/organization/components';

// containers
import * as fromContainers from '@module/organization/containers';

// guards
import * as fromGuards from '@module/organization/guards';

// services
import * as fromServices from '@module/organization/services';



@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    StoreModule.forFeature('organization', reducers),
    EffectsModule.forFeature(effects),
    ShareModule,
    OrganizationRoutingModule
  ],
  exports: [...fromComponents.components, ...fromContainers.containers],
  providers: [...fromGuards.guards, ...fromServices.services]
})
export class OrganizationModule { }
