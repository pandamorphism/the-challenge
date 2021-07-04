import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {InterpreterService} from '../../api/interpreter.service';
import {Observable} from 'rxjs';
import {InterpretedEvent} from '../../model';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHistoryComponent implements OnInit {
  @Input() eventsHistory: InterpretedEvent[] | null = [];

  constructor() {
  }

  ngOnInit(): void {

  }

}
