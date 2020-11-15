import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as mailTemplateActions from '@module/notification/store/actions/mail-template.action';
import * as fromServices from '@module/notification/services';
import { MailTemplate } from '@module/notification/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MailTemplateEffect {
  constructor(
    private _actions$: Actions,
    private _mailTemplateService: fromServices.MailTemplateService,
    private _toastr: ToastrService
  ) {}

  loadMailTemplates$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.LoadMailTemplates),
      exhaustMap(() =>
        this._mailTemplateService.findAll().pipe(
          map((mailTemplates: any) =>
            mailTemplateActions.LoadMailTemplatesSuccess({ mailTemplates: mailTemplates['content'] as MailTemplate[]})
          ),
          catchError((error: any) =>
            of(
              mailTemplateActions.LoadMailTemplatesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createMailTemplate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.CreateMailTemplate),
      mergeMap(({ mailTemplate }) =>
        this._mailTemplateService.create(mailTemplate).pipe(
          map((newMailTemplate: MailTemplate) =>
            mailTemplateActions.CreateMailTemplateSuccess({ mailTemplate: newMailTemplate })
          ),
          tap(() => {
            this._toastr.success('Modèle de mail crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              mailTemplateActions.CreateMailTemplateFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createMailTemplateSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.CreateMailTemplateSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/notification/mail-templates/details/', action.mailTemplate.id]
        });
      })
    )
  );

  updateMailTemplate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.UpdateMailTemplate),
      exhaustMap(action =>
        this._mailTemplateService.update(action.mailTemplate).pipe(
          map((mailTemplate: MailTemplate) =>
            mailTemplateActions.UpdateMailTemplateSuccess({
              mailTemplate: { id: mailTemplate.id, changes: mailTemplate }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Modèle de mail mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              mailTemplateActions.UpdateMailTemplateFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeMailTemplate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.RemoveMailTemplate),
      exhaustMap(action =>
        this._mailTemplateService.removes(action.ids).pipe(
          map((ids: string[]) =>
            mailTemplateActions.RemoveMailTemplateSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Modèle d\'email supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              mailTemplateActions.RemoveMailTemplateFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeMailTemplateSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.RemoveMailTemplateSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/notification/mail-templates/new']
        });
      })
    )
  );

  removeMailTemplates$ = createEffect(() =>
    this._actions$.pipe(
      ofType(mailTemplateActions.RemoveMailTemplates),
      exhaustMap(action =>
        this._mailTemplateService.removes(action.ids).pipe(
          map((ids: string[]) =>
            mailTemplateActions.RemoveMailTemplatesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Modèles d\'emails supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              mailTemplateActions.RemoveMailTemplatesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
