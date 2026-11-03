import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoadClientComponent } from './client/load-client/load-client.component';

export const routes: Routes = [
  {
    path: '',
    component: LoadClientComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./client/pages/home/home.component').then((m) => m.HomeComponent),
        pathMatch: 'full',
      },
      {
        path: 'collection',
        loadComponent: () =>
          import('./client/pages/collection/collection.component').then((m) => m.CollectionComponent),
        canActivate: [authGuard],
        pathMatch: 'full',
      },
      {
        path: 'movie/:cardMovieId',
        loadComponent: () =>
          import('./client/pages/card-movie/card-movie.component').then((m) => m.CardMovieComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./client/pages/search/search.component').then((m) => m.SearchComponent),
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: '' },
];
