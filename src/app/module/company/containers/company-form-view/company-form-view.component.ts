import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '@module/company/models';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/company/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-company-form-view',
  templateUrl: './company-form-view.component.html',
  styleUrls: ['./company-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormViewComponent implements OnInit {

  company$: Observable<Company>;
  companyEntities$: Observable<{[id: string]: Company}>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  logo$: Observable<any>;

  constructor(private _store: Store<fromStore.CompanyRootState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectCompanyLoading);
    this.error$ = this._store.select(fromStore.selectCompanyErrorMsg);
    this.logo$ = this._store.select(fromStore.selectCompanyLogo);
    this.company$ = this._store.select(fromStore.selectSelectedCompany);
    this.companyEntities$ = this._store.select(fromStore.selectCompanyEntities);
  }

  onCreate($event: Company) {
    this._store.dispatch(fromStore.CreateCompany({company: $event}));
  }

  onUpdate($event: Company) {
    this._store.dispatch(fromStore.UpdateCompany({company: $event}));
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveCompany({ids: $event}))
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

  onUpload($event: any) {
    this._store.dispatch(fromStore.SetCompanyLogo({id: $event.id, logo: $event.logo}));
  }



}
