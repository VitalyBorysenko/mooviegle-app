import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { normalizeSearchText } from 'src/app/shared/utils/search-text';

@Component({
  standalone: true,
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, FontAwesomeModule],
})
export class HomeSearchComponent {
  private readonly router = inject(Router);

  readonly filmIcon = faFilm;
  readonly searchText = signal('');

  search(): void {
    const trimmed = normalizeSearchText(this.searchText());
    if (!trimmed) {
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: { searchText: trimmed }
    });
  }
}
