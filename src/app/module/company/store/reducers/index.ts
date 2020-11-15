import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromCompany from '@module/company/store/reducers/company-reducer';

export interface CompanyRootState {
  companies: fromCompany.CompanyState;
}
export interface State extends fromRoot.State {
  company: CompanyRootState;
}

export function reducers(state: CompanyRootState | undefined, action: Action) {
  return combineReducers({
    companies: fromCompany.reducer
  })(state, action);
}

export const selectCompanyState = createFeatureSelector<CompanyRootState>(
  'company'
);
