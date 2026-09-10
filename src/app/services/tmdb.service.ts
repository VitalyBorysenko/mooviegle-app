import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TmdbMovieDetails,
  TmdbMovieSummary,
  TmdbPagedResponse,
} from '../models/tmdb/tmdb.models';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly baseUrl = environment.tmdbApiBaseUrl;
  private readonly apiKey = environment.tmdbApiKey;
  private readonly language = 'uk-UA';

  constructor(private http: HttpClient) { }

  getPopular(): Observable<TmdbPagedResponse<TmdbMovieSummary>> {
    return this.http.get<TmdbPagedResponse<TmdbMovieSummary>>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=${this.language}&page=1`
    );
  }

  getNowPlaying(): Observable<TmdbPagedResponse<TmdbMovieSummary>> {
    return this.http.get<TmdbPagedResponse<TmdbMovieSummary>>(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${this.language}&page=1`
    );
  }

  searchMovies(query: string): Observable<TmdbPagedResponse<TmdbMovieSummary>> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<TmdbPagedResponse<TmdbMovieSummary>>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${encodedQuery}`
    );
  }

  getMovieById(movieId: number): Observable<TmdbMovieDetails> {
    return this.http.get<TmdbMovieDetails>(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=${this.language}`
    );
  }

  getPosterUrl(posterPath: string | null | undefined): string {
    return posterPath ? `${environment.tmdbImageBaseUrl}${posterPath}` : '';
  }
}
