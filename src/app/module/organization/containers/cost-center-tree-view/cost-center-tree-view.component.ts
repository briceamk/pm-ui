import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CostCenter} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-cost-center-tree-view',
  templateUrl: './cost-center-tree-view.component.html',
  styleUrls: ['./cost-center-tree-view.component.scss']
})
export class CostCenterTreeViewComponent implements OnInit {

  costCenters$: Observable<CostCenter[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  costCenterEntities$: Observable<{ [id: string]: CostCenter }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadCostCenters());
    this.error$ = this._store.select(fromStore.selectCostCenterErrorMsg);
    this.loading$ = this._store.select(fromStore.selectCostCenterLoading);
    this.costCenters$ = this._store.select(fromStore.selectAllCostCenters);
    this.costCenterEntities$ = this._store.select(fromStore.selectCostCenterEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCostCenters({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
