import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import {DefaultModule} from '@layout/default/default.module';
import {AppComponent} from '@app/app.component';


import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  RouterState
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, metaReducers, CustomSerializer } from '@store/index';

// not use in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
      }
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      name: 'PM App',
      // In a production build you would want to disable the Store Devtools
      logOnly: environment.production
    }),
    AppRoutingModule,
    DefaultModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
