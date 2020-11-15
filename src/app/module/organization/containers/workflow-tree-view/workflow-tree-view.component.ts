import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Workflow} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-workflow-tree-view',
  templateUrl: './workflow-tree-view.component.html',
  styleUrls: ['./workflow-tree-view.component.scss']
})
export class WorkflowTreeViewComponent implements OnInit {

  workflows$: Observable<Workflow[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  workflowEntities$: Observable<{ [id: string]: Workflow }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadWorkflows());
    this.error$ = this._store.select(fromStore.selectWorkflowErrorMsg);
    this.loading$ = this._store.select(fromStore.selectWorkflowLoading);
    this.workflows$ = this._store.select(fromStore.selectAllWorkflows);
    this.workflowEntities$ = this._store.select(fromStore.selectWorkflowEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveWorkflows({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
