import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { Movie } from 'src/app/models/model.Movie';
import { TmdbMovieDetails } from 'src/app/models/tmdb/tmdb.models';
import { CollectionService } from 'src/app/services/collection.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { TmdbPosterPipe } from 'src/app/shared/pipes/tmdb-poster.pipe';
import { HomeSearchComponent } from '../home/home-search/home-search.component';

interface MovieCardViewModel {
  movieData?: TmdbMovieDetails;
  isLoading: boolean;
  loadError: boolean;
  isInCollection: boolean;
}

@Component({
  standalone: true,
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
  imports: [AsyncPipe, DatePipe, HomeSearchComponent, TmdbPosterPipe],
})
export class CardMovieComponent implements OnInit {
  viewModel$!: Observable<MovieCardViewModel>;
  collectionAdded = false;

  constructor(
    private tmdbService: TmdbService,
    public collectionService: CollectionService,
    private route: ActivatedRoute,
    private authState: AuthStateService,
    public _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.viewModel$ = this.route.params.pipe(
      tap(() => {
        this.collectionAdded = false;
      }),
      map((params) => +params['cardMovieId']),
      switchMap((movieId) => this.loadMovieCard(movieId)),
    );
  }

  addToCollection(viewModel: MovieCardViewModel): void {
    if (!this.authState.isLoggedIn() || !viewModel.movieData || viewModel.isInCollection || this.collectionAdded) {
      if (!this.authState.isLoggedIn()) {
        this._snackBar.open('Увійдіть, щоб додати фільм до колекції', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      return;
    }

    const userId = this.authState.getUserId();
    if (!userId) {
      return;
    }

    const movieData = viewModel.movieData;
    const movie: Movie = {
      user_id: userId,
      backdrop_path: movieData.backdrop_path ?? undefined,
      poster_path: movieData.poster_path ?? undefined,
      id: movieData.id,
      title: movieData.title,
      release_date: movieData.release_date,
      vote_average: movieData.vote_average,
      overview: movieData.overview
    };

    this.collectionService.addMovie(movie).subscribe({
      next: () => {
        this._snackBar.open('Успішно додано до колекції', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.collectionAdded = true;
      },
      error: () => {
        // Помилку вже показує CollectionService.
      }
    });
  }

  private loadMovieCard(movieId: number): Observable<MovieCardViewModel> {
    return this.tmdbService.getMovieById(movieId).pipe(
      switchMap((movieData) => this.withCollectionStatus(movieData)),
      startWith({ isLoading: true, loadError: false, isInCollection: false }),
      catchError(() => of({ isLoading: false, loadError: true, isInCollection: false })),
    );
  }

  private withCollectionStatus(movieData: TmdbMovieDetails): Observable<MovieCardViewModel> {
    const baseViewModel: MovieCardViewModel = {
      movieData,
      isLoading: false,
      loadError: false,
      isInCollection: false,
    };

    if (!this.authState.isLoggedIn()) {
      return of(baseViewModel);
    }

    const userId = this.authState.getUserId();
    if (!userId) {
      return of(baseViewModel);
    }

    return this.collectionService.getCollection().pipe(
      map((data) => ({
        ...baseViewModel,
        isInCollection: data.some((col) => col.user_id === userId && col.id === movieData.id),
      })),
      catchError(() => of(baseViewModel)),
    );
  }
}
