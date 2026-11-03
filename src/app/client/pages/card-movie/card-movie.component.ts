import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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

type MovieCardStatus = 'loading' | 'error' | 'ready';

interface MovieCardViewModel {
  movieData?: TmdbMovieDetails;
  status: MovieCardStatus;
  isInCollection: boolean;
}

@Component({
  standalone: true,
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, HomeSearchComponent, TmdbPosterPipe],
})
export class CardMovieComponent {
  private readonly tmdbService = inject(TmdbService);
  private readonly collectionService = inject(CollectionService);
  private readonly route = inject(ActivatedRoute);
  private readonly authState = inject(AuthStateService);
  private readonly snackBar = inject(MatSnackBar);

  readonly collectionAdded = signal(false);

  readonly viewModel = toSignal(
    this.route.params.pipe(
      tap(() => this.collectionAdded.set(false)),
      map((params) => +params['cardMovieId']),
      switchMap((movieId) => this.loadMovieCard(movieId)),
    ),
    { initialValue: this.createInitialViewModel() },
  );

  addToCollection(): void {
    const viewModel = this.viewModel();
    if (!this.authState.isLoggedIn() || !viewModel.movieData || viewModel.isInCollection || this.collectionAdded()) {
      if (!this.authState.isLoggedIn()) {
        this.snackBar.open('Увійдіть, щоб додати фільм до колекції', 'Х', {
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
        this.snackBar.open('Успішно додано до колекції', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.collectionAdded.set(true);
      },
      error: () => {
        // Помилку вже показує CollectionService.
      }
    });
  }

  private createInitialViewModel(): MovieCardViewModel {
    return { status: 'loading', isInCollection: false };
  }

  private loadMovieCard(movieId: number): Observable<MovieCardViewModel> {
    return this.tmdbService.getMovieById(movieId).pipe(
      switchMap((movieData) => this.withCollectionStatus(movieData)),
      startWith(this.createInitialViewModel()),
      catchError(() => of<MovieCardViewModel>({ status: 'error', isInCollection: false })),
    );
  }

  private withCollectionStatus(movieData: TmdbMovieDetails): Observable<MovieCardViewModel> {
    const baseViewModel: MovieCardViewModel = {
      movieData,
      status: 'ready',
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
