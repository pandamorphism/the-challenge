import {createAction, props} from '@ngrx/store';
import {InterpretedEvent} from '../../model';

export const retrieveHistory = createAction('[NumberInterpreter] - Get Number Interpreter Events History');
export const retrieveHistorySuccess = createAction('[NumberInterpreter] - Get Number Interpreter Events History Success',
  props<{ history: InterpretedEvent[] }>());

export const retrieveInterpretation = createAction('[NumberInterpreter] - Get Interpretation', props<{ number: number }>());
export const retrieveInterpretationSuccess = createAction('[NumberInterpreter] - Get Interpretation Success',
  props<{ event: InterpretedEvent }>());
