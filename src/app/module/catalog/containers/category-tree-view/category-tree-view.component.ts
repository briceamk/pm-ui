import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '@module/catalog/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-category-tree-view',
  templateUrl: './category-tree-view.component.html',
  styleUrls: ['./category-tree-view.component.scss']
})
export class CategoryTreeViewComponent implements OnInit {

  categories$: Observable<Category[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  categoryEntities$: Observable<{ [id: string]: Category }>;

  constructor(private _store: Store<fromStore.CatalogState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadCategories());
    this.error$ = this._store.select(fromStore.selectCategoryErrorMsg);
    this.loading$ = this._store.select(fromStore.selectCategoryLoading);
    this.categories$ = this._store.select(fromStore.selectAllCategories);
    this.categoryEntities$ = this._store.select(fromStore.selectCategoryEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCategories({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({ path: [$event] }));
  }

}
