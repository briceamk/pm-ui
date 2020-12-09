import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Charge} from '@module/organization/models';
import {Dictionary} from '@ngrx/entity';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-charge-form-view',
  templateUrl: './charge-form-view.component.html',
  styleUrls: ['./charge-form-view.component.scss']
})
export class ChargeFormViewComponent implements OnInit {

  charge$: Observable<Charge>;
  chargeEntities$: Observable<Dictionary<Charge>>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectChargeLoading);
    this.error$ = this._store.select(fromStore.selectChargeErrorMsg);
    this.charge$ = this._store.select(fromStore.selectSelectedCharge);
    this.chargeEntities$ = this._store.select(fromStore.selectChargeEntities);
  }

  onCreate($event: Charge) {
    this._store.dispatch(fromStore.CreateCharge({charge: $event}));
  }

  onUpdate($event: Charge) {
    this._store.dispatch(fromStore.UpdateCharge({charge: $event}));
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCharge({ids: $event}))
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }


}
