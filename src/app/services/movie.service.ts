import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  API_KEY = '1d5e9501944e54e9d9e0d0ed3285911f';


  constructor(
    private http: HttpClient,
  ) { }

  getMovie(movieId: number) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.API_KEY}&language=uk-UA`
    return this.http.get(movieDetailsUrl);
  }
}
