import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {reducers, effects} from '@module/catalog/store';


//components
import *  as fromComponents from '@module/catalog/components';

//containers
import *  as fromContainers from '@module/catalog/containers';

//guards
import *  as fromGuards from '@module/catalog/guards';

//services
import *  as fromServices from './services';

import {ShareModule} from '@share/share.module';
import { CatalogRoutingModule } from '@module/catalog/catalog-routing.module';

@NgModule({
  declarations: [...fromComponents.components, ...fromContainers.containers],
  imports: [
    CommonModule,
    StoreModule.forFeature('catalog', reducers),
    EffectsModule.forFeature(effects),
    ShareModule,
    CatalogRoutingModule
  ],
  exports: [...fromComponents.components, ...fromContainers.containers],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class CatalogModule { }
