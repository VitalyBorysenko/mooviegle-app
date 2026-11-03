import { Movie } from 'src/app/models/model.Movie';

export function filterMoviesByUser(movies: Movie[], userId: string | null): Movie[] {
  if (!userId) {
    return movies;
  }

  return movies.filter((movie) => movie.user_id === userId);
}
