import {Component, OnInit} from '@angular/core';
import {InterpreterService} from '../../api/interpreter.service';
import {InterpretedEvent} from '../../model';
import {Observable, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  eventsHistory = this.interpretService.getHistory();
  search$: Subject<{ searchNum: number }> = new Subject<{ searchNum: number }>();
  currentInterpretation$: Observable<InterpretedEvent> = this.search$.pipe(
    switchMap(({searchNum}) => this.interpretService.getInterpretation(searchNum))
  );

  constructor(private interpretService: InterpreterService) {
  }

  ngOnInit(): void {
  }
}
