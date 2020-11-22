import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Address} from '@module/organization/models';
import {Dictionary} from '@ngrx/entity';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-address-form-view',
  templateUrl: './address-form-view.component.html',
  styleUrls: ['./address-form-view.component.scss']
})
export class AddressFormViewComponent implements OnInit {

  address$: Observable<Address>;
  addressEntities$: Observable<Dictionary<Address>>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  imageHeader$: Observable<any>;
  imageFooter$: Observable<any>;

  constructor(private _store: Store<fromStore.OrganizationState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectAddressLoading);
    this.error$ = this._store.select(fromStore.selectAddressErrorMsg);
    this.imageHeader$ = this._store.select(fromStore.selectAddressImageHeader);
    this.imageFooter$ = this._store.select(fromStore.selectAddressImageFooter);
    this.address$ = this._store.select(fromStore.selectSelectedAddress);
    this.addressEntities$ = this._store.select(fromStore.selectAddressEntities);
  }

  onCreate($event: Address) {
    this._store.dispatch(fromStore.CreateAddress({address: $event}));
  }

  onUpdate($event: Address) {
    this._store.dispatch(fromStore.UpdateAddress({address: $event}));
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveAddress({ids: $event}))
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

  onUpload($event: any) {
    this._store.dispatch(fromStore.SetAddressImage({id: $event.id, image: $event.image, field: $event.field}));
  }

}
