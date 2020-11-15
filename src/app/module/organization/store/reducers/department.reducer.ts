import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromDepartment from '@module/organization/store/actions';
import {Department} from '@module/organization/models';

export interface DepartmentState extends EntityState<Department> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>({
  selectId: model => model.id,
  sortComparer: (department1: Department, department2: Department): number =>
    department1.name.localeCompare(department2.name)
});

export const initialState: DepartmentState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const departmentReducer = createReducer(
  initialState,
  on(fromDepartment.LoadDepartments, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromDepartment.LoadDepartmentsSuccess, (state, { departments }) =>
    adapter.addMany(departments, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromDepartment.CreateDepartment,
    fromDepartment.UpdateDepartment,
    (state, { department }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromDepartment.CreateDepartmentSuccess, (state, { department }) =>
    adapter.addOne(department, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromDepartment.UpdateDepartmentSuccess, (state, { department }) =>
    adapter.updateOne(department, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromDepartment.RemoveDepartmentSuccess,
    fromDepartment.RemoveDepartmentsSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromDepartment.LoadDepartmentsFail,
    fromDepartment.CreateDepartmentFail,
    fromDepartment.UpdateDepartmentFail,
    fromDepartment.RemoveDepartmentFail,
    fromDepartment.RemoveDepartmentsFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMsg
      };
    }
  )
);
export function reducer(state: DepartmentState | undefined, action: Action) {
  return departmentReducer(state, action);
}
export const selectDepartmentLoading = (state: DepartmentState) => state.loading;
export const selectDepartmentLoaded = (state: DepartmentState) => state.loaded;
export const selectDepartmentErrorMsg = (state: DepartmentState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectDepartmentIds = selectIds;
export const selectDepartmentEntities = selectEntities;
export const selectAllDepartments = selectAll;
export const selectDepartmentTotal = selectTotal;
