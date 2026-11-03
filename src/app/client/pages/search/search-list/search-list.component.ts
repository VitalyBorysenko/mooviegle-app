import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TmdbMovieSummary } from 'src/app/models/tmdb/tmdb.models';
import { TmdbService } from 'src/app/services/tmdb.service';
import { TmdbPosterPipe } from 'src/app/shared/pipes/tmdb-poster.pipe';
import { SearchViewStatus, toSearchViewStatus } from 'src/app/shared/utils/async-view-status';
import { normalizeSearchText } from 'src/app/shared/utils/search-text';

interface SearchViewModel {
  movies: TmdbMovieSummary[];
  searchText: string;
  status: SearchViewStatus;
}

@Component({
  standalone: true,
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    UpperCasePipe,
    RouterLink,
    MatTooltipModule,
    TmdbPosterPipe,
  ],
})
export class SearchListComponent {
  private readonly tmdbService = inject(TmdbService);
  private readonly route = inject(ActivatedRoute);

  readonly viewModel = toSignal(
    this.route.queryParams.pipe(
      map((params) => normalizeSearchText(params['searchText'])),
      switchMap((searchText) => this.loadSearch(searchText)),
    ),
    { initialValue: { movies: [], searchText: '', status: 'idle' } satisfies SearchViewModel },
  );

  private loadSearch(searchText: string): Observable<SearchViewModel> {
    if (!searchText) {
      return of({ movies: [], searchText: '', status: 'idle' });
    }

    return this.tmdbService.searchMovies(searchText).pipe(
      map((data) => {
        const movies = data.results ?? [];
        return {
          movies,
          searchText,
          status: toSearchViewStatus(false, false, searchText, movies.length > 0),
        };
      }),
      startWith({ movies: [], searchText, status: 'loading' } satisfies SearchViewModel),
      catchError(() => of({ movies: [], searchText, status: 'error' } satisfies SearchViewModel)),
    );
  }
}
