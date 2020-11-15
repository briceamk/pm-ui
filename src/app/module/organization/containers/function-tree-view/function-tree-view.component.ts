import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Function} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-function-tree-view',
  templateUrl: './function-tree-view.component.html',
  styleUrls: ['./function-tree-view.component.scss']
})
export class FunctionTreeViewComponent implements OnInit {

  functions$: Observable<Function[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  functionEntities$: Observable<{ [id: string]: Function }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadFunctions());
    this.error$ = this._store.select(fromStore.selectFunctionErrorMsg);
    this.loading$ = this._store.select(fromStore.selectFunctionLoading);
    this.functions$ = this._store.select(fromStore.selectAllFunctions);
    this.functionEntities$ = this._store.select(fromStore.selectFunctionEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveFunctions({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
