import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TmdbMovieSummary } from 'src/app/models/tmdb/tmdb.models';
import { TmdbPosterPipe } from '../../pipes/tmdb-poster.pipe';
import { AsyncViewStatus, toAsyncViewStatus } from '../../utils/async-view-status';

interface SliderViewModel {
  movies: TmdbMovieSummary[];
  status: AsyncViewStatus;
}

@Component({
  standalone: true,
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    UpperCasePipe,
    RouterLink,
    FontAwesomeModule,
    MatTooltipModule,
    TmdbPosterPipe,
  ],
})
export class MovieSliderComponent {
  readonly loadMovies = input.required<() => Observable<{ results: TmdbMovieSummary[] }>>();

  readonly arrowLeft = faCaretLeft;
  readonly arrowRight = faCaretRight;

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  readonly viewModel = toSignal(
    toObservable(this.loadMovies).pipe(
      switchMap((loadMovies) =>
        loadMovies().pipe(
          map((data) => {
            const movies = data.results ?? [];
            return {
              movies,
              status: toAsyncViewStatus(false, false, movies.length > 0),
            };
          }),
          startWith({ movies: [], status: 'loading' } satisfies SliderViewModel),
          catchError(() => of({ movies: [], status: 'error' } satisfies SliderViewModel)),
        ),
      ),
    ),
    { initialValue: { movies: [], status: 'loading' } satisfies SliderViewModel },
  );

  moveRight(): void {
    this.scrollTrack(1);
  }

  moveLeft(): void {
    this.scrollTrack(-1);
  }

  private scrollTrack(direction: 1 | -1): void {
    const track = this.track()?.nativeElement;
    if (!track) {
      return;
    }

    const card = track.querySelector('.movie-card') as HTMLElement | null;
    const gap = 16;
    const step = card ? card.offsetWidth + gap : 280;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
}
