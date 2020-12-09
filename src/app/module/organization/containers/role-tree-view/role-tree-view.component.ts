import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Role} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-role-tree-view',
  templateUrl: './role-tree-view.component.html',
  styleUrls: ['./role-tree-view.component.scss']
})
export class RoleTreeViewComponent implements OnInit {

  roles$: Observable<Role[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  roleEntities$: Observable<{ [id: string]: Role }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadRoles());
    this.error$ = this._store.select(fromStore.selectRoleErrorMsg);
    this.loading$ = this._store.select(fromStore.selectRoleLoading);
    this.roles$ = this._store.select(fromStore.selectAllRoles);
    this.roleEntities$ = this._store.select(fromStore.selectRoleEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveRoles({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
