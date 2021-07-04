import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {retrieveHistory, retrieveHistorySuccess} from '../actions';
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
}
