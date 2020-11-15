import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as jobInfoActions from '@module/cron/store/actions/job-info.action';
import * as fromServices from '@module/cron/services';
import { JobInfo } from '@module/cron/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JobInfoEffect {
  constructor(
    private _actions$: Actions,
    private _jobInfoService: fromServices.JobInfoService,
    private _toastr: ToastrService
  ) {}

  loadJobInfos$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.LoadJobInfos),
      exhaustMap(() =>
        this._jobInfoService.findAll().pipe(
          map((jobInfos: any) =>
            jobInfoActions.LoadJobInfosSuccess({ jobInfos: jobInfos['content'] as JobInfo[]})
          ),
          catchError((error: any) =>
            of(
              jobInfoActions.LoadJobInfosFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createJobInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.CreateJobInfo),
      mergeMap(({ jobInfo }) =>
        this._jobInfoService.create(jobInfo).pipe(
          map((newJobInfo: JobInfo) =>
            jobInfoActions.CreateJobInfoSuccess({ jobInfo: newJobInfo })
          ),
          tap(() => {
            this._toastr.success('Job crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              jobInfoActions.CreateJobInfoFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createJobInfoSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.CreateJobInfoSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/cron/job-infos/details', action.jobInfo.id]
        });
      })
    )
  );

  updateJobInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.UpdateJobInfo),
      exhaustMap(action =>
        this._jobInfoService.update(action.jobInfo).pipe(
          map((jobInfo: JobInfo) =>
            jobInfoActions.UpdateJobInfoSuccess({
              jobInfo: { id: jobInfo.id, changes: jobInfo }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Job mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              jobInfoActions.UpdateJobInfoFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeJobInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.RemoveJobInfo),
      exhaustMap(action =>
        this._jobInfoService.removes(action.ids).pipe(
          map((ids: string[]) =>
            jobInfoActions.RemoveJobInfoSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Job supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              jobInfoActions.RemoveJobInfoFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeJobInfoSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.RemoveJobInfoSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/cron/job-infos/new']
        });
      })
    )
  );


  removeJobInfos$ = createEffect(() =>
    this._actions$.pipe(
      ofType(jobInfoActions.RemoveJobInfos),
      exhaustMap(action =>
        this._jobInfoService.removes(action.ids).pipe(
          map((ids: string[]) =>
            jobInfoActions.RemoveJobInfosSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Jobs supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              jobInfoActions.RemoveJobInfosFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
