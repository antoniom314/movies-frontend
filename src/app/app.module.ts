
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReviewService } from './services/review/review.service';
import { SearchService } from './services/search/search.service';
import { DetailsService } from './services/details/details.service';
import { GenresService } from './services/genres/genres.service';
import { CacheInterceptor } from './cache.interceptor';
import { AutofocusDirective } from './autofocus.directive';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
    SearchComponent,
    DetailsComponent,
    PageNotFoundComponent,
    AddReviewComponent,
    AdminComponent,
    AutofocusDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ReviewService,
    SearchService,
    DetailsService,
    GenresService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
