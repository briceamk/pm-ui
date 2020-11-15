import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as levelActions from '@module/organization/store/actions/level.action';
import * as fromServices from '@module/organization/services';
import { Level } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LevelEffect {
  constructor(
    private _actions$: Actions,
    private _levelService: fromServices.LevelService,
    private _toastr: ToastrService
  ) {}

  loadLevels$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.LoadLevels),
      exhaustMap(() =>
        this._levelService.findAll().pipe(
          map((levels: any) =>
            levelActions.LoadLevelsSuccess({ levels: levels['content'] as Level[]})
          ),
          catchError((error: any) =>
            of(
              levelActions.LoadLevelsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createLevel$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.CreateLevel),
      mergeMap(({ level }) =>
        this._levelService.create(level).pipe(
          map((newLevel: Level) =>
            levelActions.CreateLevelSuccess({ level: newLevel })
          ),
          tap(() => {
            this._toastr.success('Niveau crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              levelActions.CreateLevelFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createLevelSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.CreateLevelSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/levels/details', action.level.id]
        });
      })
    )
  );

  updateLevel$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.UpdateLevel),
      exhaustMap(action =>
        this._levelService.update(action.level).pipe(
          map((level: Level) =>
            levelActions.UpdateLevelSuccess({
              level: { id: level.id, changes: level }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Niveau mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              levelActions.UpdateLevelFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeLevel$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.RemoveLevel),
      exhaustMap(action =>
        this._levelService.removes(action.ids).pipe(
          map((ids: string[]) =>
            levelActions.RemoveLevelSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Niveau supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              levelActions.RemoveLevelFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeLevelSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.RemoveLevelSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/levels/new']
        });
      })
    )
  );


  removeLevels$ = createEffect(() =>
    this._actions$.pipe(
      ofType(levelActions.RemoveLevels),
      exhaustMap(action =>
        this._levelService.removes(action.ids).pipe(
          map((ids: string[]) =>
            levelActions.RemoveLevelsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Niveaus supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              levelActions.RemoveLevelsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
