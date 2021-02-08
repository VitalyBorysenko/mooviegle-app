import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadClientComponent } from "./load-client/load-client.component";
import { CardMovieComponent } from './pages/card-movie/card-movie.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { HomeComponent } from "./pages/home/home.component";
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '', component: LoadClientComponent,

    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'collection', component: CollectionComponent, pathMatch: 'full' },
      { path: 'movie/:cardMovieId', component: CardMovieComponent },
      { path: 'search', component: SearchComponent, pathMatch: 'full' },

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientRoutingModule { }