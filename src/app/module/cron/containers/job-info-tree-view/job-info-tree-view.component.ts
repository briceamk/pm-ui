import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {JobInfo} from '@module/cron/models';
import * as fromStore from '@module/cron/store';
import * as fromRoot from '@app/store';

@Component({
  selector: 'pm-job-info-tree-view',
  templateUrl: './job-info-tree-view.component.html',
  styleUrls: ['./job-info-tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobInfoTreeViewComponent implements OnInit {

  jobInfos$: Observable<JobInfo[]>;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  jobInfoEntities$: Observable<{ [id: string]: JobInfo }>;

  constructor(private _store: Store<fromStore.CronState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromStore.LoadJobInfos());
    this.error$ = this._store.select(fromStore.selectJobInfoErrorMsg);
    this.loading$ = this._store.select(fromStore.selectJobInfoLoading);
    this.jobInfos$ = this._store.select(fromStore.selectAllJobInfos);
    this.jobInfoEntities$ = this._store.select(fromStore.selectJobInfoEntities);
  }

  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveJobInfos({ ids: $event }));
  }

  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
