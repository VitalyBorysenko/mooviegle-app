import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoadClientComponent } from './client/load-client/load-client.component';
import { CardMovieComponent } from './client/pages/card-movie/card-movie.component';
import { CollectionComponent } from './client/pages/collection/collection.component';
import { HomeComponent } from './client/pages/home/home.component';
import { SearchComponent } from './client/pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: LoadClientComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'collection', component: CollectionComponent, canActivate: [authGuard], pathMatch: 'full' },
      { path: 'movie/:cardMovieId', component: CardMovieComponent },
      { path: 'search', component: SearchComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: '' },
];
