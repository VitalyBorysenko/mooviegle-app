import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  imports: [FormsModule, FontAwesomeModule],
})
export class HomeSearchComponent {
  filmIcon = faFilm;
  searchText = '';

  constructor(
    private router: Router,
  ) { }

  Search(searchValue: string): void {
    const trimmed = searchValue?.trim();
    if (!trimmed) {
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: { searchText: trimmed }
    });
  }
}
