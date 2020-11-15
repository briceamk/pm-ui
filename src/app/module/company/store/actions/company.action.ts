import { createAction, props } from '@ngrx/store';
import { Company } from '@module/company/models'
import { Update } from '@ngrx/entity';

export const LoadCompanies = createAction(
  '[Company List Page] Load Companies '
);
export const LoadCompaniesSuccess = createAction(
  '[Company API] Load Companies Success',
  props<{ companies: Company[] }>()
);
export const LoadCompaniesFail = createAction(
  '[Company API] Load Companies Fail',
  props<{ errorMsg: any }>()
);

export const CreateCompany = createAction(
  '[Company Form Page] Create Company ',
  props<{ company: Company }>()
);
export const CreateCompanySuccess = createAction(
  '[Company API] Create Company Success',
  props<{ company: Company }>()
);
export const CreateCompanyFail = createAction(
  '[Company API] Create Company Fail',
  props<{ errorMsg: any }>()
);
export const UpdateCompany = createAction(
  '[Company Form Page] Update Company ',
  props<{ company: Company }>()
);
export const UpdateCompanySuccess = createAction(
  '[Company API] Update Company Success',
  props<{ company: Update<Company> }>()
);
export const UpdateCompanyFail = createAction(
  '[Company API] Update Company Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCompany = createAction(
  '[Company Form Page] Remove Company ',
  props<{ ids: string[] }>()
);
export const RemoveCompanySuccess = createAction(
  '[Company API] Remove Company Success',
  props<{ ids: string[] }>()
);
export const RemoveCompanyFail = createAction(
  '[Company API] Remove Company Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCompanies = createAction(
  '[Company List Page] Remove Companies ',
  props<{ ids: string[] }>()
);
export const RemoveCompaniesSuccess = createAction(
  '[Company API] Remove Companies Success',
  props<{ ids: string[] }>()
);
export const RemoveCompaniesFail = createAction(
  '[Company API] Remove Companies Fails',
  props<{ errorMsg: any }>()
);

export const DownloadCompanyLogo = createAction(
  '[Company Form] Download Company Logo',
  props<{ id: string }>()
);

export const DownloadCompanyLogoSuccess = createAction(
  '[Company API] Download Company Logo Success',
  props<{ logo: any }>()
);

export const DownloadCompanyLogoFail = createAction(
  '[Company API] Download Company Logo Fail',
  props<{ errorMsg: any }>()
);

export const SetCompanyLogo = createAction(
  '[Company Form] Set Company Logo',
  props<{ id: string; logo: File }>()
);

export const SetCompanyLogoSuccess = createAction(
  '[Company API] Set Company Logo Success',
  props<{ company: Update<Company> }>()
);

export const SetCompanyLogoFail = createAction(
  '[Company API] Set Company Logo Fail',
  props<{ errorMsg: any }>()
);
