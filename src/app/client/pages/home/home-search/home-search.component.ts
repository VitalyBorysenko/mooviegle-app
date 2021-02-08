import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {

  filmIcon = faFilm;
  searchText: string = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  Search(searchValue: string) {
    if (searchValue) {
      const url = `/search?searchText=${searchValue}`;
      this.router.navigateByUrl(url);
    }
  }
}
