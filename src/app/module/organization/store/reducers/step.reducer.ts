import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromStep from '@module/organization/store/actions';
import {Step} from '@module/organization/models';

export interface StepState extends EntityState<Step> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Step> = createEntityAdapter<Step>({
  selectId: model => model.id,
  sortComparer: (step1: Step, step2: Step): number =>
    step1.sequence.localeCompare(step2.sequence)
});

export const initialState: StepState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const stepReducer = createReducer(
  initialState,
  on(fromStep.LoadSteps, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromStep.LoadStepsSuccess, (state, { steps }) =>
    adapter.addMany(steps, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromStep.CreateStep,
    fromStep.UpdateStep,
    (state, { step }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromStep.CreateStepSuccess, (state, { step }) =>
    adapter.addOne(step, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromStep.UpdateStepSuccess, (state, { step }) =>
    adapter.updateOne(step, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromStep.RemoveStepSuccess,
    fromStep.RemoveStepsSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromStep.LoadStepsFail,
    fromStep.CreateStepFail,
    fromStep.UpdateStepFail,
    fromStep.RemoveStepFail,
    fromStep.RemoveStepsFail,
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
export function reducer(state: StepState | undefined, action: Action) {
  return stepReducer(state, action);
}
export const selectStepLoading = (state: StepState) => state.loading;
export const selectStepLoaded = (state: StepState) => state.loaded;
export const selectStepErrorMsg = (state: StepState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectStepIds = selectIds;
export const selectStepEntities = selectEntities;
export const selectAllSteps = selectAll;
export const selectStepTotal = selectTotal;
