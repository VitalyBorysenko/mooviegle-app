import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  API_KEY = '1d5e9501944e54e9d9e0d0ed3285911f';
  url = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=uk-UA&query=`;

  constructor(
    private http: HttpClient
  ) { }

  findMovies(title: string) {
    return this.http.get(this.url + `${title}`)
  }
}
