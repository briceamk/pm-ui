import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Department} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-department-tree-view',
  templateUrl: './department-tree-view.component.html',
  styleUrls: ['./department-tree-view.component.scss']
})
export class DepartmentTreeViewComponent implements OnInit {

  departments$: Observable<Department[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  departmentEntities$: Observable<{ [id: string]: Department }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadDepartments());
    this.error$ = this._store.select(fromStore.selectDepartmentErrorMsg);
    this.loading$ = this._store.select(fromStore.selectDepartmentLoading);
    this.departments$ = this._store.select(fromStore.selectAllDepartments);
    this.departmentEntities$ = this._store.select(fromStore.selectDepartmentEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveDepartments({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
