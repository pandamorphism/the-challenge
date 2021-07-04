import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{
      path: '',
      loadChildren: () => import('./feature/number-interpreter/number-interpreter.module').then(m => m.NumberInterpreterModule)
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
