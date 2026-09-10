import { Component } from '@angular/core';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { HomeSearchComponent } from './home-search/home-search.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HomeSearchComponent, CategoriesListComponent],
})
export class HomeComponent { }
