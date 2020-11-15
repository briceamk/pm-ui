import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as stepActions from '@module/organization/store/actions/step.action';
import * as fromServices from '@module/organization/services';
import { Step } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class StepEffect {
  constructor(
    private _actions$: Actions,
    private _stepService: fromServices.StepService,
    private _toastr: ToastrService
  ) {}

  loadSteps$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.LoadSteps),
      exhaustMap(() =>
        this._stepService.findAll().pipe(
          map((steps: any) =>
            stepActions.LoadStepsSuccess({ steps: steps['content'] as Step[]})
          ),
          catchError((error: any) =>
            of(
              stepActions.LoadStepsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createStep$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.CreateStep),
      mergeMap(({ step }) =>
        this._stepService.create(step).pipe(
          map((newStep: Step) =>
            stepActions.CreateStepSuccess({ step: newStep })
          ),
          tap(() => {
            this._toastr.success('Etape crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              stepActions.CreateStepFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createStepSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.CreateStepSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/steps/details', action.step.id]
        });
      })
    )
  );

  updateStep$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.UpdateStep),
      exhaustMap(action =>
        this._stepService.update(action.step).pipe(
          map((step: Step) =>
            stepActions.UpdateStepSuccess({
              step: { id: step.id, changes: step }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Etape mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              stepActions.UpdateStepFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeStep$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.RemoveStep),
      exhaustMap(action =>
        this._stepService.removes(action.ids).pipe(
          map((ids: string[]) =>
            stepActions.RemoveStepSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Etape supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              stepActions.RemoveStepFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeStepSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.RemoveStepSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/steps/new']
        });
      })
    )
  );


  removeSteps$ = createEffect(() =>
    this._actions$.pipe(
      ofType(stepActions.RemoveSteps),
      exhaustMap(action =>
        this._stepService.removes(action.ids).pipe(
          map((ids: string[]) =>
            stepActions.RemoveStepsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Etapes supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              stepActions.RemoveStepsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
