import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AuthStateService } from 'src/app/auth/auth-state.service';
import { Movie } from 'src/app/models/model.Movie';
import { CollectionService } from 'src/app/services/collection.service';
import { TmdbPosterPipe } from 'src/app/shared/pipes/tmdb-poster.pipe';
import { AsyncViewStatus, toAsyncViewStatus } from 'src/app/shared/utils/async-view-status';
import { filterMoviesByUser } from './collection.util';

interface CollectionViewModel {
  movies: Movie[];
  status: AsyncViewStatus;
}

@Component({
  standalone: true,
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, UpperCasePipe, RouterLink, TmdbPosterPipe],
})
export class CollectionComponent {
  private readonly collectionService = inject(CollectionService);
  private readonly authState = inject(AuthStateService);

  readonly viewModel = toSignal(this.createViewModel(), {
    initialValue: { movies: [], status: 'loading' } satisfies CollectionViewModel,
  });

  private createViewModel(): Observable<CollectionViewModel> {
    if (!this.authState.isLoggedIn()) {
      return of({ movies: [], status: 'empty' });
    }

    const userId = this.authState.getUserId();
    return this.collectionService.getCollection().pipe(
      map((data) => {
        const movies = filterMoviesByUser(data, userId);
        return {
          movies,
          status: toAsyncViewStatus(false, false, movies.length > 0),
        };
      }),
      startWith({ movies: [], status: 'loading' } satisfies CollectionViewModel),
      catchError(() => of({ movies: [], status: 'error' } satisfies CollectionViewModel)),
    );
  }
}
