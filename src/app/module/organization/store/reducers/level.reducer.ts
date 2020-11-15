import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromLevel from '@module/organization/store/actions';
import {Level} from '@module/organization/models';

export interface LevelState extends EntityState<Level> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Level> = createEntityAdapter<Level>({
  selectId: model => model.id,
  sortComparer: (level1: Level, level2: Level): number =>
    level1.amount.toString().localeCompare(level2.amount.toString())
});

export const initialState: LevelState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const levelReducer = createReducer(
  initialState,
  on(fromLevel.LoadLevels, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromLevel.LoadLevelsSuccess, (state, { levels }) =>
    adapter.addMany(levels, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromLevel.CreateLevel,
    fromLevel.UpdateLevel,
    (state, { level }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromLevel.CreateLevelSuccess, (state, { level }) =>
    adapter.addOne(level, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromLevel.UpdateLevelSuccess, (state, { level }) =>
    adapter.updateOne(level, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromLevel.RemoveLevelSuccess,
    fromLevel.RemoveLevelsSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromLevel.LoadLevelsFail,
    fromLevel.CreateLevelFail,
    fromLevel.UpdateLevelFail,
    fromLevel.RemoveLevelFail,
    fromLevel.RemoveLevelsFail,
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
export function reducer(state: LevelState | undefined, action: Action) {
  return levelReducer(state, action);
}
export const selectLevelLoading = (state: LevelState) => state.loading;
export const selectLevelLoaded = (state: LevelState) => state.loaded;
export const selectLevelErrorMsg = (state: LevelState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectLevelIds = selectIds;
export const selectLevelEntities = selectEntities;
export const selectAllLevels = selectAll;
export const selectLevelTotal = selectTotal;
