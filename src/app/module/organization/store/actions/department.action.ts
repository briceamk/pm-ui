import { createAction, props } from '@ngrx/store';
import { Department } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadDepartments = createAction(
  '[Department List Page] Load Departments '
);
export const LoadDepartmentsSuccess = createAction(
  '[Department API] Load Departments Success',
  props<{ departments: Department[] }>()
);
export const LoadDepartmentsFail = createAction(
  '[Department API] Load Departments Fail',
  props<{ errorMsg: any }>()
);

export const CreateDepartment = createAction(
  '[Department Form Page] Create Department ',
  props<{ department: Department }>()
);
export const CreateDepartmentSuccess = createAction(
  '[Department API] Create Department Success',
  props<{ department: Department }>()
);
export const CreateDepartmentFail = createAction(
  '[Department API] Create Department Fail',
  props<{ errorMsg: any }>()
);
export const UpdateDepartment = createAction(
  '[Department Form Page] Update Department ',
  props<{ department: Department }>()
);
export const UpdateDepartmentSuccess = createAction(
  '[Department API] Update Department Success',
  props<{ department: Update<Department> }>()
);
export const UpdateDepartmentFail = createAction(
  '[Department API] Update Department Fail',
  props<{ errorMsg: any }>()
);

export const RemoveDepartment = createAction(
  '[Department Form Page] Remove Department ',
  props<{ ids: string[] }>()
);
export const RemoveDepartmentSuccess = createAction(
  '[Department API] Remove Department Success',
  props<{ ids: string[] }>()
);
export const RemoveDepartmentFail = createAction(
  '[Department API] Remove Department Fail',
  props<{ errorMsg: any }>()
);


export const RemoveDepartments = createAction(
  '[Department List Page] Remove Departments ',
  props<{ ids: string[] }>()
);
export const RemoveDepartmentsSuccess = createAction(
  '[Department API] Remove Departments Success',
  props<{ ids: string[] }>()
);
export const RemoveDepartmentsFail = createAction(
  '[Department API] Remove Departments Fails',
  props<{ errorMsg: any }>()
);
