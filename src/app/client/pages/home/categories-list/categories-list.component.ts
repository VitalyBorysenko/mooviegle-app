import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieSliderComponent } from 'src/app/shared/components/movie-slider/movie-slider.component';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  standalone: true,
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MovieSliderComponent],
})
export class CategoriesListComponent {
  private readonly tmdbService = inject(TmdbService);

  readonly loadPopular = () => this.tmdbService.getPopular();
  readonly loadNowPlaying = () => this.tmdbService.getNowPlaying();
}
