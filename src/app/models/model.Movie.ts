export interface Genres {
  id?: number;
  name?: string;
}
export class Movie {
  user_id?: string;
  backdrop_path?: string;
  poster_path?: string;
  id?: number;
  title?: string;
  release_date?: string;
  genres?: Genres[];
  vote_average?: number;
  overview?: string;
}