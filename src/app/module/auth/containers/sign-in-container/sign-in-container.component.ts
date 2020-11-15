import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as models from '@module/auth/models';

import * as fromStore from '@module/auth/store';

@Component({
  selector: 'pm-sign-in-container',
  templateUrl: './sign-in-container.component.html',
  styleUrls: ['./sign-in-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInContainerComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private _store: Store<fromStore.SecurityState>) {
    this.loggedIn$  = this._store.select(fromStore.selectAuthLoggedIn);
    this.loading$  = this._store.select(fromStore.selectAuthLoading);
    this.error$ = this._store.select(fromStore.selectAuthErrorMsg);
  }

  ngOnInit(): void {
  }

  onSignIn($event: models.SignInRequest) {
    this._store.dispatch(fromStore.SignIn({signInRequest: $event}))
  }

}
