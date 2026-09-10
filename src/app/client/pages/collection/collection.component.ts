import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { Movie } from 'src/app/models/model.Movie';
import { CollectionService } from 'src/app/services/collection.service';
import { TmdbPosterPipe } from 'src/app/shared/pipes/tmdb-poster.pipe';

interface CollectionViewModel {
  movies: Movie[];
  isLoading: boolean;
  loadError: boolean;
}

@Component({
  standalone: true,
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  imports: [AsyncPipe, DatePipe, UpperCasePipe, RouterLink, TmdbPosterPipe],
})
export class CollectionComponent implements OnInit {
  viewModel$!: Observable<CollectionViewModel>;

  constructor(
    private collectionService: CollectionService,
    public authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    if (!this.authState.isLoggedIn()) {
      this.viewModel$ = of({ movies: [], isLoading: false, loadError: false });
      return;
    }

    const userId = this.authState.getUserId();
    this.viewModel$ = this.collectionService.getCollection().pipe(
      map((data) => ({
        movies: userId ? data.filter((movie) => movie.user_id === userId) : data,
        isLoading: false,
        loadError: false,
      })),
      startWith({ movies: [], isLoading: true, loadError: false }),
      catchError(() => of({ movies: [], isLoading: false, loadError: true })),
    );
  }
}
