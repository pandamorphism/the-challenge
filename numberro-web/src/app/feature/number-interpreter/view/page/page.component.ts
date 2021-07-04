import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {allHistory$, currentInterpretation$, FeatureState} from '../../state/reducers';
import {clearCurrentInterpretation, retrieveHistory, retrieveInterpretation} from '../../state/actions';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  eventsHistory$ = this.store.pipe(select(allHistory$));
  currentInterpretation$ = this.store.pipe(select(currentInterpretation$));

  constructor(private store: Store<FeatureState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(retrieveHistory());
  }

  onSearch(query: { searchNum: string }) {
    this.store.dispatch(
      this.ensureDigitsOnly(query?.searchNum.trim()) ?
        retrieveInterpretation({number: query.searchNum.trim()}) : clearCurrentInterpretation());
  }

  private ensureDigitsOnly(searchNum: string | undefined) {
    return searchNum && /^\d+$/.test(searchNum);
  }
}
