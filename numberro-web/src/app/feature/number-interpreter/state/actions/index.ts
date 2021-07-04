import {createAction, props} from '@ngrx/store';
import {InterpretedEvent} from '../../model';

export const retrieveHistory = createAction('[NumberInterpreter] - Get Number Interpreter Events History');
export const retrieveHistorySuccess = createAction('[NumberInterpreter] - Get Number Interpreter Events History Success',
  props<{ history: InterpretedEvent[] }>());

export const clearCurrentInterpretation = createAction('[NumberInterpreter] - Clear Current Interpretation');
export const retrieveInterpretation = createAction('[NumberInterpreter] - Get Interpretation', props<{ number: string }>());
export const retrieveInterpretationSuccess = createAction('[NumberInterpreter] - Get Interpretation Success',
  props<{ event: InterpretedEvent }>());
