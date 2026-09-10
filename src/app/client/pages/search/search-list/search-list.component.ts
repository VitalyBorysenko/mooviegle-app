import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TmdbMovieSummary } from 'src/app/models/tmdb/tmdb.models';
import { TmdbService } from 'src/app/services/tmdb.service';
import { TmdbPosterPipe } from 'src/app/shared/pipes/tmdb-poster.pipe';

interface SearchViewModel {
  movies: TmdbMovieSummary[];
  searchText: string;
  isLoading: boolean;
  loadError: boolean;
}

@Component({
  standalone: true,
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  imports: [
    AsyncPipe,
    DatePipe,
    UpperCasePipe,
    RouterLink,
    MatTooltipModule,
    TmdbPosterPipe,
  ],
})
export class SearchListComponent implements OnInit {
  viewModel$!: Observable<SearchViewModel>;

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.viewModel$ = this.route.queryParams.pipe(
      map((params) => (params['searchText'] ?? '').trim()),
      switchMap((searchText) => this.loadSearch(searchText)),
    );
  }

  private loadSearch(searchText: string): Observable<SearchViewModel> {
    if (!searchText) {
      return of({ movies: [], searchText: '', isLoading: false, loadError: false });
    }

    return this.tmdbService.searchMovies(searchText).pipe(
      map((data) => ({
        movies: data.results ?? [],
        searchText,
        isLoading: false,
        loadError: false,
      })),
      startWith({ movies: [], searchText, isLoading: true, loadError: false }),
      catchError(() => of({ movies: [], searchText, isLoading: false, loadError: true })),
    );
  }
}
