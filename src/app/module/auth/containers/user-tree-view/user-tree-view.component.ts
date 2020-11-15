import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import {User} from '@module/auth/models';

import * as fromRoot from '@store/index';
import * as fromStore from '@module/auth/store';

@Component({
  selector: 'pm-user-tree-view',
  templateUrl: './user-tree-view.component.html',
  styleUrls: ['./user-tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTreeViewComponent implements OnInit {

  users$: Observable<User[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  userEntities$: Observable<{ [id: string]: User }>;

  constructor(private _store: Store<fromStore.SecurityState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadUsers());
    this.error$ = this._store.select(fromStore.selectUserErrorMsg);
    this.loading$ = this._store.select(fromStore.selectUserLoading);
    this.users$ = this._store.select(fromStore.selectAllUsers);
    this.userEntities$ = this._store.select(fromStore.selectUserEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveUsers({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({ path: [$event] }));
  }

}
