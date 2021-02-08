import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_KEY = '1d5e9501944e54e9d9e0d0ed3285911f';
  popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=uk-UA&page=1`;
  nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&language=uk-UA&page=1`;
  constructor(
    private http: HttpClient
  ) { }

  findPopular() {
    return this.http.get(this.popularUrl);
  }

  findNowPlaying(){
    return this.http.get(this.nowPlayingUrl);
  }
}
