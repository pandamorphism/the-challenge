import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {
  retrieveHistory,
  retrieveHistorySuccess,
  retrieveInterpretation,
  retrieveInterpretationSuccess
} from '../actions';
import {map, mergeMap, switchMap, take} from 'rxjs/operators';
import {InterpreterService} from '../../api/interpreter.service';
import {FeatureState, fromLocalHistory$} from '../reducers';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';

@Injectable()
export class Effects {
  constructor(private actions$: Actions,
              private store: Store<FeatureState>,
              private interpreterService: InterpreterService) {
  }

  fetchHistory$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveHistory),
    switchMap(() => this.interpreterService.getHistory()),
    map(history => retrieveHistorySuccess({history})),
  ));

  fetchInterpretation = createEffect(() => this.actions$.pipe(
    ofType(retrieveInterpretation),
    switchMap(({number}) => this.store.pipe(select(fromLocalHistory$(number))).pipe(
      take(1),
      mergeMap(found => found ? of(found) : this.interpreterService.getInterpretation(number))
      )
    ),
    map(interpretation => retrieveInterpretationSuccess({event: interpretation}))
  ));
}
