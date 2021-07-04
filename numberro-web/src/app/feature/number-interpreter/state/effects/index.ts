import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {
  retrieveHistory,
  retrieveHistorySuccess,
  retrieveInterpretation,
  retrieveInterpretationSuccess
} from '../actions';
import {map, switchMap} from 'rxjs/operators';
import {InterpreterService} from '../../api/interpreter.service';

@Injectable()
export class Effects {
  constructor(private actions$: Actions,
              private interpreterService: InterpreterService) {
  }

  fetchHistory$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveHistory),
    switchMap(() => this.interpreterService.getHistory()),
    map(history => retrieveHistorySuccess({history})),
  ));

  fetchInterpretation = createEffect(() => this.actions$.pipe(
    ofType(retrieveInterpretation),
    switchMap(({number}) => this.interpreterService.getInterpretation(number)),
    map(interpretation => retrieveInterpretationSuccess({event: interpretation}))
  ));
}
