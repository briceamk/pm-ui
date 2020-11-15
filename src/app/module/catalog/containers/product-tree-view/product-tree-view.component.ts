import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '@module/catalog/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-product-tree-view',
  templateUrl: './product-tree-view.component.html',
  styleUrls: ['./product-tree-view.component.scss']
})
export class ProductTreeViewComponent implements OnInit {

  products$: Observable<Product[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  productEntities$: Observable<{ [id: string]: Product }>;

  constructor(private _store: Store<fromStore.CatalogState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadProducts());
    this.error$ = this._store.select(fromStore.selectProductErrorMsg);
    this.loading$ = this._store.select(fromStore.selectProductLoading);
    this.products$ = this._store.select(fromStore.selectAllProducts);
    this.productEntities$ = this._store.select(fromStore.selectProductEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveProducts({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({ path: [$event] }));
  }

}
