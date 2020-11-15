import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as mailActions from '@module/notification/store/actions/mail.action';
import * as fromServices from '@module/notification/services';
import { Mail } from '@module/notification/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MailEffect {
  constructor(
    private _actions$: Actions,
    private _mailService: fromServices.MailService,
    private _toastr: ToastrService
  ) {}

  loadMails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.LoadMails),
      exhaustMap(() =>
        this._mailService.findAll().pipe(
          map((mails: any) =>
            mailActions.LoadMailsSuccess({ mails: mails['content'] as Mail[]})
          ),
          catchError((error: any) =>
            of(
              mailActions.LoadMailsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createMail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.CreateMail),
      mergeMap(({ mail }) =>
        this._mailService.create(mail).pipe(
          map((newMail: Mail) =>
            mailActions.CreateMailSuccess({ mail: newMail })
          ),
          tap(() => {
            this._toastr.success('Email crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              mailActions.CreateMailFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createMailSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.CreateMailSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/notification/mails/details', action.mail.id]
        });
      })
    )
  );

  updateMail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.UpdateMail),
      exhaustMap(action =>
        this._mailService.update(action.mail).pipe(
          map((mail: Mail) =>
            mailActions.UpdateMailSuccess({
              mail: { id: mail.id, changes: mail }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Email mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              mailActions.UpdateMailFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeMail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.RemoveMail),
      exhaustMap(action =>
        this._mailService.removes(action.ids).pipe(
          map((ids: string[]) =>
            mailActions.RemoveMailSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Email supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              mailActions.RemoveMailFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeMailSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.RemoveMailSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/notification/mails/new']
        });
      })
    )
  );


  removeMails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailActions.RemoveMails),
      exhaustMap(action =>
        this._mailService.removes(action.ids).pipe(
          map((ids: string[]) =>
            mailActions.RemoveMailsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Emails supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              mailActions.RemoveMailsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
