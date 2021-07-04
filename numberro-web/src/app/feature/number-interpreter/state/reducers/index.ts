import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {InterpretedEvent} from '../../model';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as NumberInterpreterActions from '../actions';

export const featureKey = 'number-interpreter';

export interface FeatureState extends EntityState<InterpretedEvent> {

}

export const adapter: EntityAdapter<InterpretedEvent> = createEntityAdapter<InterpretedEvent>({
  selectId: model => model.id,
  sortComparer: false
});

const initialState = adapter.getInitialState({});
const interpretedEventReducer = createReducer(initialState,
  on(NumberInterpreterActions.retrieveHistorySuccess, (state, {history}) => adapter.setMany(history, state))
);

let featureSelector = createFeatureSelector<FeatureState>(featureKey);
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(featureSelector);
export const allHistory$ = selectAll;

// public selectors

export function reducer(state: FeatureState, action: Action) {
  return interpretedEventReducer(state, action);
}


