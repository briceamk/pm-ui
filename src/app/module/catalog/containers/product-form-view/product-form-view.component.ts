import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Catalog, Category, Product} from '@module/catalog/models';
import {Dictionary} from '@ngrx/entity';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-product-form-view',
  templateUrl: './product-form-view.component.html',
  styleUrls: ['./product-form-view.component.scss']
})
export class ProductFormViewComponent implements OnInit {

  product$: Observable<Product>;
  catalogs$: Observable<Catalog[]>;
  categories$: Observable<Category[]>;
  productEntities$: Observable<Dictionary<Product>>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  image$: Observable<any>;

  constructor(private _store: Store<fromStore.CatalogState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectProductLoading);
    this.error$ = this._store.select(fromStore.selectProductErrorMsg);
    this.image$ = this._store.select(fromStore.selectProductImage);
    this.product$ = this._store.select(fromStore.selectSelectedProduct);
    this.catalogs$ = this._store.select(fromStore.selectAllCatalogs);
    this.categories$ = this._store.select(fromStore.selectAllCategories);
    this.productEntities$ = this._store.select(fromStore.selectProductEntities);
  }

  onCreate($event: Product) {
    this._store.dispatch(fromStore.CreateProduct({product: $event}));
  }

  onUpdate($event: Product) {
    this._store.dispatch(fromStore.UpdateProduct({product: $event}));
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveProduct({ids: $event}))
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

  onUpload($event: any) {
    this._store.dispatch(fromStore.SetProductImage({id: $event.id, image: $event.image}));
  }


}
