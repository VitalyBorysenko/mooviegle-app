import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from './layout/layout.module';
import { LoadClientComponent } from './load-client/load-client.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientRoutingModule } from './client-routing.module';
import { RegisterComponent } from './modals/register/register.component';
import { LoginComponent } from './modals/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeSearchComponent } from './pages/home/home-search/home-search.component';
import { SearchListComponent } from './pages/search/search-list/search-list.component';
import { CategoriesListComponent } from './pages/home/categories-list/categories-list.component';
import { SearchComponent } from './pages/search/search.component';
import { PopSliderComponent } from './pages/home/categories-list/pop-slider/pop-slider.component';
import { OwlModule } from 'ngx-owl-carousel';
import { CardMovieComponent } from './pages/card-movie/card-movie.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NowplayingSliderComponent } from './pages/home/categories-list/nowplaying-slider/nowplaying-slider.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    LoadClientComponent,
    HomeComponent,

    LoginComponent,
    RegisterComponent,
    HomeSearchComponent,
    SearchListComponent,
    CategoriesListComponent,
    SearchComponent,
    PopSliderComponent,
    CardMovieComponent,
    NowplayingSliderComponent,
    CollectionComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    FontAwesomeModule,
    OwlModule,
    MatTooltipModule,
    MatSnackBarModule ,
  ],

})
export class ClientModule { }