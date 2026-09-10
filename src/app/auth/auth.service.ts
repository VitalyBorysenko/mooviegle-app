import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorsService } from './errors.service';
import { AuthLoginInfo } from './login-info';
import { FirebaseAuthResponse } from './firebase-auth.model';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = `${environment.firebaseAuthBaseUrl}/accounts:signInWithPassword?key=${environment.firebaseApiKey}`;
  private readonly signupUrl = `${environment.firebaseAuthBaseUrl}/accounts:signUp?key=${environment.firebaseApiKey}`;

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
  ) { }

  auth(emailPassword: AuthLoginInfo): Observable<FirebaseAuthResponse> {
    return this.http.post<FirebaseAuthResponse>(this.loginUrl, emailPassword, httpOptions).pipe(
      map((res) => res),
      catchError((err) => {
        const message = err.error?.error?.errors?.[0]?.message;
        this.errorsService.openErrorInAuth(err.status, message);
        return throwError(() => err);
      })
    );
  }

  signUp(info: SignUpInfo): Observable<FirebaseAuthResponse> {
    return this.http.post<FirebaseAuthResponse>(this.signupUrl, info, httpOptions).pipe(
      map((res) => res),
      catchError((err) => {
        const message = err.error?.error?.errors?.[0]?.message;
        this.errorsService.openErrorInAuth(err.status, message);
        return throwError(() => err);
      })
    );
  }
}
