import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchFormComponent} from './view/search-form/search-form.component';
import {SearchHistoryComponent} from './view/search-history/search-history.component';
import {PageComponent} from './view/page/page.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {Effects} from './state/effects';
import {StoreModule} from '@ngrx/store';
import * as fromFeatureReducers from './state/reducers';


@NgModule({
  declarations: [
    SearchFormComponent,
    SearchHistoryComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageComponent
      }
    ]),
    EffectsModule.forFeature([Effects]),
    StoreModule.forFeature(fromFeatureReducers.featureKey, fromFeatureReducers.reducer)
  ]
})
export class NumberInterpreterModule {
}
