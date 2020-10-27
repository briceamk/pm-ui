import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '../../../../store';
import * as mailServerActions from '../actions/mail-server.action';
import * as fromServices from '../../services';
import { MailServer } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MailServerEffect {
  constructor(
    private _actions$: Actions,
    private _mailServerService: fromServices.MailServerService,
    private _toastr: ToastrService
  ) {}

  loadMailServers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailServerActions.LoadMailServers),
      exhaustMap(() =>
        this._mailServerService.findAll().pipe(
          map((mailServers: any) =>
            mailServerActions.LoadMailServersSuccess({ mailServers: mailServers['content'] as MailServer[]})
          ),
          catchError((error: any) =>
            of(
              mailServerActions.LoadMailServersFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createMailServer$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailServerActions.CreateMailServer),
      mergeMap(({ mailServer }) =>
        this._mailServerService.create(mailServer).pipe(
          map((newMailServer: MailServer) =>
            mailServerActions.CreateMailServerSuccess({ mailServer: newMailServer })
          ),
          tap(() => {
            this._toastr.success('Serveur Mail crée correctement', 'PM App');
          }),
          catchError((error: any) =>
            of(
              mailServerActions.CreateMailServerFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createMailServerSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailServerActions.CreateMailServerSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/notification/mail-servers/details', action.mailServer.id]
        });
      })
    )
  );

  updateMailServer$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailServerActions.UpdateMailServer),
      exhaustMap(action =>
        this._mailServerService.update(action.mailServer).pipe(
          map((mailServer: MailServer) =>
            mailServerActions.UpdateMailServerSuccess({
              mailServer: { id: mailServer.id, changes: mailServer }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Serveur Mail mis à jour correctement',
              'PM App'
            );
          }),
          catchError((error: any) =>
            of(
              mailServerActions.UpdateMailServerFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeMailServers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailServerActions.RemoveMailServers),
      exhaustMap(action =>
        this._mailServerService.removes(action.ids).pipe(
          map((ids: string[]) =>
            mailServerActions.RemoveMailServersSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Serveur Mail supprimés correctement',
              'PM App'
            );
          }),
          catchError((error: any) =>
            of(
              mailServerActions.RemoveMailServersFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
