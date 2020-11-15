import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/auth/store';
import * as models from '@module/auth/models';

@Component({
  selector: 'pm-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpContainerComponent implements OnInit {

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

  onSignUp($event: models.SignUpRequest) {
    this._store.dispatch(fromStore.SignUp({signUpRequest: $event}))
  }

}
