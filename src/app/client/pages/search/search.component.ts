import { Component } from '@angular/core';
import { HomeSearchComponent } from '../home/home-search/home-search.component';
import { SearchListComponent } from './search-list/search-list.component';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [HomeSearchComponent, SearchListComponent],
})
export class SearchComponent { }
