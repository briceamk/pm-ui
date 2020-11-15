import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Catalog} from '@module/catalog/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import * as fromRoot from '@app/store';
import {Dictionary} from '@ngrx/entity';

@Component({
  selector: 'pm-catalog-form-view',
  templateUrl: './catalog-form-view.component.html',
  styleUrls: ['./catalog-form-view.component.scss']
})
export class CatalogFormViewComponent implements OnInit {

  catalog$: Observable<Catalog>;
  catalogs$: Observable<Catalog[]>;
  catalogEntities$: Observable<Dictionary<Catalog>>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private _store: Store<fromStore.CatalogState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectCatalogLoading);
    this.error$ = this._store.select(fromStore.selectCatalogErrorMsg);
    this.catalog$ = this._store.select(fromStore.selectSelectedCatalog);
    this.catalogs$ = this._store.select(fromStore.selectAllCatalogs);
    this.catalogEntities$ = this._store.select(fromStore.selectCatalogEntities);
  }

  onCreate($event: Catalog) {
    this._store.dispatch(fromStore.CreateCatalog({catalog: $event}));
  }

  onUpdate($event: Catalog) {
    this._store.dispatch(fromStore.UpdateCatalog({catalog: $event}));
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCatalog({ids: $event}))
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }


}
