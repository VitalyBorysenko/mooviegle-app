export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMovieSummary {
  id: number;
  title: string;
  original_title?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
}

export interface TmdbMovieDetails extends TmdbMovieSummary {
  genres: TmdbGenre[];
  runtime?: number;
  status?: string;
  tagline?: string;
}

export interface TmdbPagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
