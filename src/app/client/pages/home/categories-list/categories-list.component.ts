import { Component } from '@angular/core';
import { MovieSliderComponent } from 'src/app/shared/components/movie-slider/movie-slider.component';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  standalone: true,
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  imports: [MovieSliderComponent],
})
export class CategoriesListComponent {
  constructor(private tmdbService: TmdbService) { }

  loadPopular = () => this.tmdbService.getPopular();
  loadNowPlaying = () => this.tmdbService.getNowPlaying();
}
