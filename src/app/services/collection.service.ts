import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/model.Movie';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly collectionUrl = `${environment.firebaseDatabaseUrl}api/filmsCollection.json`;
  private firebaseUnavailableNotified = false;

  constructor(
    private http: HttpClient,
    public _snackBar: MatSnackBar,
  ) {
  }

  addMovie(movie: Movie) {
    return this.http
      .post(this.collectionUrl, movie, httpOptions)
      .pipe(
        map((data: unknown) => data),
        catchError((err) => this.handleCollectionError(err))
      );
  }

  getCollection(): Observable<Movie[]> {
    return this.http
      .get<Record<string, Movie>>(this.collectionUrl)
      .pipe(
        map((data) => this.mapCollectionResponse(data)),
        catchError((err) => this.handleCollectionError(err) as Observable<Movie[]>)
      );
  }

  private mapCollectionResponse(data: Record<string, Movie> | null): Movie[] {
    if (!data || typeof data !== 'object') {
      return [];
    }

    return Object.entries(data).map(([key, movie]) => ({
      ...movie,
      firebaseKey: key,
    }));
  }

  private handleCollectionError(err: { status?: number; error?: string | { error?: string } }): Observable<never> {
    if (err.status === 423) {
      this.notifyFirebaseUnavailable();
    }

    const errorMessage = typeof err.error === 'string'
      ? err.error
      : err.error?.error;

    if (errorMessage === 'Permission denied') {
      this._snackBar.open('Немає доступу до колекції. Перевірте Firebase rules', 'Х', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

    if (errorMessage === 'Could not parse auth token.') {
      this._snackBar.open('Увійдіть, щоб працювати з колекцією', 'Х', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

    return throwError(() => err);
  }

  private notifyFirebaseUnavailable(): void {
    if (this.firebaseUnavailableNotified) {
      return;
    }

    this.firebaseUnavailableNotified = true;
    this._snackBar.open('Колекція тимчасово недоступна: Firebase проект заблокований', 'Х', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
