import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Address} from '@module/organization/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-address-tree-view',
  templateUrl: './address-tree-view.component.html',
  styleUrls: ['./address-tree-view.component.scss']
})
export class AddressTreeViewComponent implements OnInit {

  addresses$: Observable<Address[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  addressEntities$: Observable<{ [id: string]: Address }>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadAddresses());
    this.error$ = this._store.select(fromStore.selectAddressErrorMsg);
    this.loading$ = this._store.select(fromStore.selectAddressLoading);
    this.addresses$ = this._store.select(fromStore.selectAllAddresses);
    this.addressEntities$ = this._store.select(fromStore.selectAddressEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveAddresses({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
