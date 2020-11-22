import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@share/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import {NgSelectModule} from '@ng-select/ng-select';

// components
import * as fromComponents from '@share/components';

// directives
import * as fromDirectives from '@share/directives';

// interceptors
import { AuthInterceptor } from '@module/auth/interceptors/auth.interceptor';
import {
  MatDatetimepickerModule,
  MAT_DATETIME_FORMATS,
} from '@mat-datetimepicker/core';



@NgModule({
  declarations: [...fromComponents.components, ...fromDirectives.directives],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    MatDatetimepickerModule,
    MatMomentDateModule,
    MatMomentDatetimeModule,
    NgSelectModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule,
    ToastrModule,
    QuillModule,
    MatDatetimepickerModule,
    NgSelectModule,
    ...fromComponents.components,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
          monthInput: 'MMMM',
          timeInput: 'HH:mm:ss',
          datetimeInput: 'DD/MM/YYYY HH:mm:ss',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthInput: 'MM',
          datetimeInput: 'DD/MM/YYYY HH:mm:ss',
          timeInput: 'HH:mm:ss',
          monthYearLabel: 'MM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MM YYYY',
          popupHeaderDateLabel: 'ddd, DD MMM',
        },
      },
    },
  ],
})
export class ShareModule {}
