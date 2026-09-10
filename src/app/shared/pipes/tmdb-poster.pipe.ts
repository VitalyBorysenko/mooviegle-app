import { Pipe, PipeTransform } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Pipe({
  name: 'tmdbPoster',
  standalone: true,
})
export class TmdbPosterPipe implements PipeTransform {
  constructor(private tmdbService: TmdbService) { }

  transform(posterPath: string | null | undefined): string {
    return this.tmdbService.getPosterUrl(posterPath);
  }
}
