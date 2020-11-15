import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from '@store/index';
import * as companyActions from '@module/company/store/actions/company.action';
import * as fromServices from '@module/company/services';
import { Company } from '@module/company/models';


@Injectable()
export class CompanyEffect {
  constructor(
    private _actions$: Actions,
    private _companyService: fromServices.CompanyService,
    private _toastr: ToastrService
  ) {}

  loadCompanies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.LoadCompanies),
      exhaustMap(() =>
        this._companyService.findAll().pipe(
          map((companies: any) =>
            companyActions.LoadCompaniesSuccess({ companies: companies['content'] as Company[]})
          ),
          catchError((error: any) =>
            of(
              companyActions.LoadCompaniesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCompany$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.CreateCompany),
      mergeMap(({ company }) =>
        this._companyService.create(company).pipe(
          map((newCompany: Company) =>
            companyActions.CreateCompanySuccess({ company: newCompany })
          ),
          tap(() => {
            this._toastr.success('Société créee correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              companyActions.CreateCompanyFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCompanySuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.CreateCompanySuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/company/companies/details', action.company.id]
        });
      })
    )
  );

  updateCompany$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.UpdateCompany),
      exhaustMap(action =>
        this._companyService.update(action.company).pipe(
          map((company: Company) =>
            companyActions.UpdateCompanySuccess({
              company: { id: company.id, changes: company }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Société mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              companyActions.UpdateCompanyFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  updateCompanyAndSetCompanyImageSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.UpdateCompanySuccess, companyActions.SetCompanyLogoSuccess),
      map(action => {
        return companyActions.DownloadCompanyLogo({id: action.company.changes.id});
      })
    )
  );

  setCompanyLogo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.SetCompanyLogo),
      exhaustMap(action =>
        this._companyService.upload(action.id, action.logo).pipe(
          map((company: Company) =>
            companyActions.SetCompanyLogoSuccess({
              company: { id: company.id, changes: company }
            })
          ),
          tap(() => {
            this._toastr.info(
              'Logo mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              companyActions.SetCompanyLogoFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  setCompanyLogoSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.SetCompanyLogoSuccess),
      map(action => {
        return companyActions.DownloadCompanyLogo({id: action.company.id as string});
      })
    )
  );

  downloadCompanyLogo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.DownloadCompanyLogo),
      exhaustMap(action =>
        this._companyService.download(action.id).pipe(
          map((logo: any) =>
            companyActions.DownloadCompanyLogoSuccess({logo})
          ),
          catchError((error: any) =>
            of(
              companyActions.DownloadCompanyLogoFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeCompany$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.RemoveCompany),
      exhaustMap(action =>
        this._companyService.removes(action.ids).pipe(
          map((ids: string[]) =>
            companyActions.RemoveCompanySuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Société supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              companyActions.RemoveCompanyFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeCompanySuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.RemoveCompanySuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/company/companies/new']
        });
      })
    )
  );

  removeCompanies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(companyActions.RemoveCompanies),
      exhaustMap(action =>
        this._companyService.removes(action.ids).pipe(
          map((ids: string[]) =>
            companyActions.RemoveCompaniesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.warning(
              'Sociétés supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              companyActions.RemoveCompaniesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
