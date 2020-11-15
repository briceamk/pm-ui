import {ChangeDetectionStrategy, Component, OnInit,} from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromStore from '@module/auth/store';
import {Observable} from 'rxjs';
import {SignInResponse} from '@module/auth/models';

@Component({
  selector: 'pm-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  loggedIn$: Observable<boolean>;
  error$: Observable<any>;
  profile$: Observable<SignInResponse>;

  constructor(private _store: Store<fromStore.SecurityState>) {
    this.loggedIn$  = this._store.select(fromStore.selectAuthLoggedIn);
    this.error$ = this._store.select(fromStore.selectAuthErrorMsg);
    this.profile$ = this._store.select(fromStore.selectAuthProfile);
  }

  ngOnInit(): void { }

  doToggleSideBar($event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  doSignOut($event) {
    this._store.dispatch(fromStore.SignOut());
  }

}
