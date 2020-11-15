
import { createSelector } from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/company/store/reducers';
import * as fromCompany from '@module/company/store/reducers/company-reducer';

import { Company } from '@module/company/models';
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

export const selectCompanyLogo = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyLogo
);

export const selectCompanyErrorMsg = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyErrorMsg
);
export const selectCompanyTotal = createSelector(
  selectCompanyState,
  fromCompany.selectCompanyTotal
);
