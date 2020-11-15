import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Catalog} from '@module/catalog/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-catalog-tree-view',
  templateUrl: './catalog-tree-view.component.html',
  styleUrls: ['./catalog-tree-view.component.scss']
})
export class CatalogTreeViewComponent implements OnInit {

  catalogs$: Observable<Catalog[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  catalogEntities$: Observable<{ [id: string]: Catalog }>;

  constructor(private _store: Store<fromStore.CatalogState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadCatalogs());
    this.error$ = this._store.select(fromStore.selectCatalogErrorMsg);
    this.loading$ = this._store.select(fromStore.selectCatalogLoading);
    this.catalogs$ = this._store.select(fromStore.selectAllCatalogs);
    this.catalogEntities$ = this._store.select(fromStore.selectCatalogEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCatalogs({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({ path: [$event] }));
  }
}
