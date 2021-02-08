import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from "rxjs/operators";
import { Movie } from '../models/model.Movie';
import { TokenStorageService } from '../auth/token-storage.service';
import { throwError } from 'rxjs';
import { ErrorsService } from '../auth/errors.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  token: any;

  private collectionUrl = `${environment.url}api/filmsCollection.json`;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private errorsService: ErrorsService,
    public _snackBar: MatSnackBar,
  ) {
    this.token = this.tokenStorage.getToken()
  }

  addMovie(movie: Movie) {
    const url = `${this.collectionUrl}?auth=${this.token}`;
    return this.http
      .post(url, movie, httpOptions)
      .pipe(map((data: any) => data), catchError((err) => {
        if (err.error.error === "Could not parse auth token.") {
          this._snackBar.open('Зареєструйтесь щоб додати колекції', 'Х', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        return throwError(err);
      }));
  }

  getCollection() {
    const querry = `${this.collectionUrl}?auth=${this.token}`;
    return this.http
      .get(querry)
      .pipe(map((data: any) => {
        if (data) {
          return Object.keys(data).map(key => ({
            ...data[key],
          })
          )
        }
        else {
          return [];
        }
      }
      ),
        catchError((err) => {
          this.errorsService.openErrorInAuth(err.status, err.error.error);
          return throwError(err);
        })
      );
  }
}
