import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {currentInterpretation$, featureKey} from '../../state/reducers';
import {SearchFormComponent} from '../search-form/search-form.component';
import {SearchHistoryComponent} from '../search-history/search-history.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatCardModule,
        MatIconModule],
      providers: [
        provideMockStore({
          initialState: {[featureKey]: {ids: []}}
        })
      ],
      declarations: [PageComponent, SearchFormComponent, SearchHistoryComponent]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display empty interpretation results on init', function () {
    const searchForm = fixture.debugElement.query(By.directive(SearchFormComponent));
    let resultsBlock = searchForm.nativeElement.querySelector('.mat-card.results');
    expect(resultsBlock).toBeTruthy();
    let content = resultsBlock.querySelector('mat-card-content')?.textContent;
    expect(content).toBeFalsy();
  });
  it('should display interpretation results after selector emitted one', function () {
    const interpretation = 'one';
    store.overrideSelector(currentInterpretation$,
      {
        interpretation, number: '1', id: 0, timestamp: new Date(), userId: 27
      });
    store.refreshState();
    fixture.detectChanges();
    const searchForm = fixture.debugElement.query(By.directive(SearchFormComponent));
    let resultsBlock = searchForm.nativeElement.querySelector('.mat-card.results');
    expect(resultsBlock).toBeTruthy();
    let content = resultsBlock.querySelector('mat-card-content')?.textContent;
    expect(content).toBe(interpretation);
  });
});
