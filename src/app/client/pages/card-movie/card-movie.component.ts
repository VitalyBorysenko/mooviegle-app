import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CollectionService } from 'src/app/services/collection.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent implements OnInit {

  movieData: any;
  movieId: any;
  isMovie: boolean = false;

  constructor(
    public movieService: MovieService,
    public collectionService: CollectionService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    public _snackBar: MatSnackBar,
  ) {
    this.route.params.subscribe(params => {
      this.movieId = +params.cardMovieId;
    });
    this.filterColection();
  }

  ngOnInit(): void {
    this.loadMovie();
  }

  private _subs: Subscription = new Subscription();
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  loadMovie() {
    this._subs.add(this.movieService.getMovie(this.movieId).subscribe(data => {
      this.movieData = data;
    }))
  }

  getImgUrl(path: string) {
    const imgSrc = `https://image.tmdb.org/t/p/w500`;
    return imgSrc + path;
  }

  addToCollection() {
    const movie = {
      user_id: this.tokenStorage.getUserId(),
      backdrop_path: this.movieData.backdrop_path,
      poster_path: this.movieData.poster_path,
      id: this.movieData.id,
      title: this.movieData.title,
      release_date: this.movieData.release_date,
      vote_average: this.movieData.vote_average,
      overview: this.movieData.overview
    }
    this.collectionService.addMovie(movie).subscribe(res => {
      this._snackBar.open('Успішно додано до колекції', 'Х', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.isMovie = true;
    })
  }

  filterColection() {
    this.collectionService.getCollection().subscribe(data => {
      const filteredBbColection = data.filter(col => col.user_id === this.tokenStorage.getUserId() && col.id === this.movieData.id
      );
      if (filteredBbColection.length) {
        this.isMovie = true;
      }
    })
  }

}
