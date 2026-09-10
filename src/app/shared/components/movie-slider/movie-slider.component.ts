import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { TmdbMovieSummary } from 'src/app/models/tmdb/tmdb.models';
import { TmdbPosterPipe } from '../../pipes/tmdb-poster.pipe';

interface SliderViewModel {
  movies: TmdbMovieSummary[];
  isLoading: boolean;
  loadError: boolean;
}

@Component({
  standalone: true,
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss'],
  imports: [
    AsyncPipe,
    DatePipe,
    UpperCasePipe,
    RouterLink,
    FontAwesomeModule,
    MatTooltipModule,
    TmdbPosterPipe,
  ],
})
export class MovieSliderComponent implements OnInit {
  @Input({ required: true }) loadMovies!: () => Observable<{ results: TmdbMovieSummary[] }>;

  viewModel$!: Observable<SliderViewModel>;
  arrowLeft = faCaretLeft;
  arrowRight = faCaretRight;

  @ViewChild('track', { static: false })
  track!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.viewModel$ = this.loadMovies().pipe(
      map((data) => ({
        movies: data.results ?? [],
        isLoading: false,
        loadError: false,
      })),
      startWith({ movies: [], isLoading: true, loadError: false }),
      catchError(() => of({ movies: [], isLoading: false, loadError: true })),
    );
  }

  moveRight(): void {
    this.scrollTrack(1);
  }

  moveLeft(): void {
    this.scrollTrack(-1);
  }

  private scrollTrack(direction: 1 | -1): void {
    const track = this.track?.nativeElement;
    if (!track) {
      return;
    }

    const card = track.querySelector('.movie-card') as HTMLElement | null;
    const gap = 16;
    const step = card ? card.offsetWidth + gap : 280;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
}
