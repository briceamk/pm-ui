import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from '@module/auth/auth-routing.module';
import {ShareModule} from '@share/share.module';

import { reducers, effects } from '@module/auth/store';

// components
import * as fromComponents from '@module/auth/components';

//containers
import * as fromContainers from '@module/auth/containers';

//services
import * as fromServices from '@module/auth/services';

//guards
import * as fromGuards from '@module/auth/guards';

// interceptors
import { AuthInterceptor } from '@module/auth/interceptors/auth.interceptor';



@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('security', reducers),
    EffectsModule.forFeature(effects),
    AuthRoutingModule,
    ShareModule
  ],
  exports: [
    ...fromComponents.components,
    ...fromContainers.containers
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AuthModule,
      providers: [
        ...fromServices.services,
        ...fromGuards.guards,
       { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
