import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as workflowActions from '@module/organization/store/actions/workflow.action';
import * as fromServices from '@module/organization/services';
import { Workflow } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class WorkflowEffect {
  constructor(
    private _actions$: Actions,
    private _workflowService: fromServices.WorkflowService,
    private _toastr: ToastrService
  ) {}

  loadWorkflows$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.LoadWorkflows),
      exhaustMap(() =>
        this._workflowService.findAll().pipe(
          map((workflows: any) =>
            workflowActions.LoadWorkflowsSuccess({ workflows: workflows['content'] as Workflow[]})
          ),
          catchError((error: any) =>
            of(
              workflowActions.LoadWorkflowsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createWorkflow$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.CreateWorkflow),
      mergeMap(({ workflow }) =>
        this._workflowService.create(workflow).pipe(
          map((newWorkflow: Workflow) =>
            workflowActions.CreateWorkflowSuccess({ workflow: newWorkflow })
          ),
          tap(() => {
            this._toastr.success('Circuit de validation crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              workflowActions.CreateWorkflowFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createWorkflowSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.CreateWorkflowSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/workflows/details', action.workflow.id]
        });
      })
    )
  );

  updateWorkflow$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.UpdateWorkflow),
      exhaustMap(action =>
        this._workflowService.update(action.workflow).pipe(
          map((workflow: Workflow) =>
            workflowActions.UpdateWorkflowSuccess({
              workflow: { id: workflow.id, changes: workflow }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Circuit de validation mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              workflowActions.UpdateWorkflowFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeWorkflow$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.RemoveWorkflow),
      exhaustMap(action =>
        this._workflowService.removes(action.ids).pipe(
          map((ids: string[]) =>
            workflowActions.RemoveWorkflowSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Circuit de validation supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              workflowActions.RemoveWorkflowFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeWorkflowSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.RemoveWorkflowSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/workflows/new']
        });
      })
    )
  );


  removeWorkflows$ = createEffect(() =>
    this._actions$.pipe(
      ofType(workflowActions.RemoveWorkflows),
      exhaustMap(action =>
        this._workflowService.removes(action.ids).pipe(
          map((ids: string[]) =>
            workflowActions.RemoveWorkflowsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Circuits de validation supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              workflowActions.RemoveWorkflowsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
