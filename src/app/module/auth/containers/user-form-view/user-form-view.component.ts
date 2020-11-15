import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Role, User} from '@module/auth/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/auth/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormViewComponent implements OnInit {

  user$: Observable<User>;
  roles$: Observable<Role[]>;
  userEntities$: Observable<{[id: string]: User}>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private _store: Store<fromStore.SecurityState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectUserLoading);
    this.error$ = this._store.select(fromStore.selectUserErrorMsg);
    this.user$ = this._store.select(fromStore.selectSelectedUser);
    this.roles$ = this._store.select(fromStore.selectAllRoles);
    this.userEntities$ = this._store.select(fromStore.selectUserEntities);
  }

  onCreate($event: User) {
    this._store.dispatch(fromStore.CreateUser({user: $event}));
  }
  onUpdate($event: User) {
    this._store.dispatch(fromStore.UpdateUser({user: $event}));
  }
  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveUser({ids: $event}))
  }
  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }
}
