import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromStore from '@module/cron/store'
import {JobInfo} from '@module/cron/models';

@Component({
  selector: 'pm-job-info-form-view',
  templateUrl: './job-info-form-view.component.html',
  styleUrls: ['./job-info-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobInfoFormViewComponent implements OnInit {

  jobInfo$: Observable<JobInfo>;
  jobInfoEntities$: Observable<{[id: string]: JobInfo}>;
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private _store: Store<fromStore.CronState>) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(fromStore.selectJobInfoLoading);
    this.error$ = this._store.select(fromStore.selectJobInfoErrorMsg);
    this.jobInfo$ = this._store.select(fromStore.selectSelectedJobInfo);
    this.jobInfoEntities$ = this._store.select(fromStore.selectJobInfoEntities);
  }

  onCreate($event: JobInfo) {
    this._store.dispatch(fromStore.CreateJobInfo({jobInfo: $event}));
  }
  onUpdate($event: JobInfo) {
    this._store.dispatch(fromStore.UpdateJobInfo({jobInfo: $event}));
  }
  onRemoves($event: string[]) {
    this._store.dispatch(fromStore.RemoveJobInfo({ids: $event}))
  }
  onNavigate($event: string) {
    this._store.dispatch(fromRoot.GO({path: [$event]}));
  }

}
