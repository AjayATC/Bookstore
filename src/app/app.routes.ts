import {  Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookCartComponent } from './components/book-cart/book-cart.component';

export const routes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: "", redirectTo: "books", pathMatch: "full"},
  {path: 'add', component: BookFormComponent},
  {path: 'edit/:id', component: BookFormComponent},
  {path: 'details/:id', component: BookDetailsComponent},
  {path: 'cart', component: BookCartComponent},
];
