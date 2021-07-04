import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchFormComponent} from './view/search-form/search-form.component';
import {SearchHistoryComponent} from './view/search-history/search-history.component';
import {PageComponent} from './view/page/page.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    SearchFormComponent,
    SearchHistoryComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageComponent
      }
    ])
  ]
})
export class NumberInterpreterModule {
}
