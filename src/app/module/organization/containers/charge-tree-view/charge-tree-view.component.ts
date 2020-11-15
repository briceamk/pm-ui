import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Charge} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-charge-tree-view',
  templateUrl: './charge-tree-view.component.html',
  styleUrls: ['./charge-tree-view.component.scss']
})
export class ChargeTreeViewComponent implements OnInit {

  charges$: Observable<Charge[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  chargeEntities$: Observable<{ [id: string]: Charge }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadCharges());
    this.error$ = this._store.select(fromStore.selectChargeErrorMsg);
    this.loading$ = this._store.select(fromStore.selectChargeLoading);
    this.charges$ = this._store.select(fromStore.selectAllCharges);
    this.chargeEntities$ = this._store.select(fromStore.selectChargeEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCharges({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
