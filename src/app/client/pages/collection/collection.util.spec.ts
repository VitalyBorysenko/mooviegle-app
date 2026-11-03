import { Movie } from 'src/app/models/model.Movie';
import { filterMoviesByUser } from './collection.util';

describe('filterMoviesByUser', () => {
  const movies: Movie[] = [
    { id: 1, user_id: 'user-a', title: 'A' },
    { id: 2, user_id: 'user-b', title: 'B' },
  ];

  it('returns only movies that belong to the user', () => {
    expect(filterMoviesByUser(movies, 'user-a')).toEqual([movies[0]]);
  });

  it('returns all movies when user id is missing', () => {
    expect(filterMoviesByUser(movies, null)).toEqual(movies);
  });
});
