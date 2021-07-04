import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {InterpretedEvent} from '../../model';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as NumberInterpreterActions from '../actions';

export const featureKey = 'number-interpreter';

export interface FeatureState extends EntityState<InterpretedEvent> {
  currentInterpretation: InterpretedEvent,
}

export const adapter: EntityAdapter<InterpretedEvent> = createEntityAdapter<InterpretedEvent>({
  selectId: model => model.id,
  sortComparer: (m1, m2) => new Date(m2.timestamp).getTime() - new Date(m1.timestamp).getTime()
});

const initialState = adapter.getInitialState({});
const interpretedEventReducer = createReducer(initialState,
  on(NumberInterpreterActions.retrieveHistorySuccess, (state, {history}) => adapter.setMany(history, state)),
  on(NumberInterpreterActions.retrieveInterpretationSuccess, (state, {event}) =>
    adapter.upsertOne(event, {...state, currentInterpretation: event})),
);

//selectors
let featureSelector = createFeatureSelector<FeatureState>(featureKey);
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(featureSelector);
export const allHistory$ = selectAll;
export const currentInterpretation$ = createSelector(featureSelector, state => state.currentInterpretation);

// public selectors

export function reducer(state: FeatureState, action: Action) {
  return interpretedEventReducer(state, action);
}


