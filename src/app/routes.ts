import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReviewComponent } from './components/review/review.component';
import { DetailsComponent } from './components/details/details.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'review', component: ReviewComponent},
  { path: 'details/:id', component: DetailsComponent},
  { path: 'add-review', component: AddReviewComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'review', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
