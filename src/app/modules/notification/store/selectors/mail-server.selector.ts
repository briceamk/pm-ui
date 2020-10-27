
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromCompany from '../reducers/company-reducer';

import { Company } from '../../models';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

const selectCompanyState = createSelector(
  fromFeature.selectCompanyState,
  (state: fromFeature.CompanyRootState) => state.companies
);

export const selectCompanyEntities = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyEntities
);

export const selectSelectedCompany = createSelector(
  selectCompanyEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Company>, params: Params): Company => {
    return params && entities[params.companyId];
  }
);

export const selectCompanyIds = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyIds
);

export const selectAllCompanies = createSelector(
  selectCompanyState,
  fromCompany.selectAllCompanies
);

export const selectCompanyLoaded = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyLoaded
);
export const selectCompanyLoading = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyLoading
);

export const selectCompanyErrorMsg = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyErrorMsg
);
export const selectCompanyTotal = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyTotal
);
