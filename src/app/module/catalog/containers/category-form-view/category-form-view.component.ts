import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '@module/catalog/models';
import {Dictionary} from '@ngrx/entity';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-category-form-view',
  templateUrl: './category-form-view.component.html',
  styleUrls: ['./category-form-view.component.scss']
})
export class CategoryFormViewComponent implements OnInit {

  category$: Observable<Category>;
  categories$: Observable<Category[]>;
  categoryEntities$: Observable<Dictionary<Category>>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private _store: Store<fromStore.CatalogState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectCategoryLoading);
    this.error$ = this._store.select(fromStore.selectCategoryErrorMsg);
    this.category$ = this._store.select(fromStore.selectSelectedCategory);
    this.categories$ = this._store.select(fromStore.selectAllCategories);
    this.categoryEntities$ = this._store.select(fromStore.selectCategoryEntities);
  }

  onCreate($event: Category) {
    this._store.dispatch(fromStore.CreateCategory({category: $event}));
  }

  onUpdate($event: Category) {
    this._store.dispatch(fromStore.UpdateCategory({category: $event}));
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCategory({ids: $event}))
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
