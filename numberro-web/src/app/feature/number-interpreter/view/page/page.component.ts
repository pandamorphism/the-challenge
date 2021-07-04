import {Component, OnInit} from '@angular/core';
import {InterpreterService} from '../../api/interpreter.service';
import {InterpretedEvent} from '../../model';
import {Observable, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {allHistory$, FeatureState} from '../../state/reducers';
import {retrieveHistory} from '../../state/actions';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  eventsHistory$ = this.store.pipe(select(allHistory$));

  search$: Subject<{ searchNum: number }> = new Subject<{ searchNum: number }>();
  currentInterpretation$: Observable<InterpretedEvent> = this.search$.pipe(
    switchMap(({searchNum}) => this.interpretService.getInterpretation(searchNum))
  );

  constructor(private interpretService: InterpreterService /* should be removed */,
              private store: Store<FeatureState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(retrieveHistory());
  }
}
