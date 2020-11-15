import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import * as fromRoot from '@store/index';
import * as fromStore from '@module/company/store';
import {Company} from '@module/company/models';


@Component({
  selector: 'pm-company-tree-view',
  templateUrl: './company-tree-view.component.html',
  styleUrls: ['./company-tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTreeViewComponent implements OnInit {

  companies$: Observable<Company[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  companyEntities$: Observable<{ [id: string]: Company }>;

  constructor(private _store: Store<fromStore.CompanyRootState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadCompanies());
      this.error$ = this._store.select(fromStore.selectCompanyErrorMsg);
      this.loading$ = this._store.select(fromStore.selectCompanyLoading);
      this.companies$ = this._store.select(fromStore.selectAllCompanies);
      this.companyEntities$ = this._store.select(fromStore.selectCompanyEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCompanies({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({ path: [$event] }));
  }

}
