import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '@module/company/store/actions';
import { Company } from '@module/company/models';

export interface CompanyState extends EntityState<Company> {
  loading?: boolean;
  loaded?: boolean;
  logo: any;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Company> = createEntityAdapter<Company>({
  selectId: model => model.id,
  sortComparer: (company1: Company, company2: Company): number =>
    company1.code.localeCompare(company2.code)
});

export const initialState: CompanyState = adapter.getInitialState({
  loading: false,
  loaded: false,
  logo: null,
  errorMsg: null,
});

export const companyReducer = createReducer(
  initialState,
  on(fromActions.LoadCompanies, state => ({
    ...state,
    loading: true,
    loaded: false,
    logo: null,
    errorMsg: null
  })),
  on(fromActions.LoadCompaniesSuccess, (state, { companies }) =>
    adapter.addMany(companies, {
      ...state,
      loading: false,
      loaded: true,
      logo: null,
      errorMsg: null
    })
  ),
  on(fromActions.CreateCompanySuccess, (state, { company }) =>
    adapter.addOne(company, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(
    fromActions.SetCompanyLogo, (state, { id, logo }) => {
      return {
        ...state,
        loading: true,
        loaded: false
      };

    }
  ),
  on(
    fromActions.UpdateCompanySuccess,
    fromActions.SetCompanyLogoSuccess,
    (state, { company }) =>
    adapter.updateOne(company, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(
    fromActions.DownloadCompanyLogo, (state, { id }) => {
      return {
        ...state,
        loading: true,
        logo: null,
        loaded: false
      };

    }
  ),
  on(fromActions.DownloadCompanyLogoSuccess, (state, { logo }) => ({
    ...state,
    logo,
    loading: false,
    loaded: true,
  })),

  on(
    fromActions.RemoveCompanySuccess,
    fromActions.RemoveCompaniesSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      logo: null,
      errorMsg: null
    });
  }),

  on(
    fromActions.LoadCompaniesFail,
    fromActions.CreateCompanyFail,
    fromActions.UpdateCompanyFail,
    fromActions.RemoveCompanyFail,
    fromActions.RemoveCompaniesFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        logo: null,
        errorMsg
      };
    }
  )
);
export function reducer(state: CompanyState | undefined, action: Action) {
  return companyReducer(state, action);
}
export const selectCompanyLoading = (state: CompanyState) => state.loading;
export const selectCompanyLoaded = (state: CompanyState) => state.loaded;
export const selectCompanyLogo = (state: CompanyState) => state.logo;
export const selectCompanyErrorMsg = (state: CompanyState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectCompanyIds = selectIds;
export const selectCompanyEntities = selectEntities;
export const selectAllCompanies = selectAll;
export const selectCompanyTotal = selectTotal;
