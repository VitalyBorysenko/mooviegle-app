import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey = `AIzaSyCSXASi0PgJCD-VlRjyByiyVri-FukScNw`;
  private loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  private signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  constructor(
    private http: HttpClient,
    public _snackBar: MatSnackBar,
    private storage: TokenStorageService,
    private errorsService: ErrorsService,
  ) { }

  auth(emailPassword: AuthLoginInfo) {
    return this.http.post(this.loginUrl, emailPassword, httpOptions).pipe(map((res: any) => {
      if (res) {
        this.storage.saveToken(res.idToken);
      }
      return res;
    }), catchError((err) => {
      this.errorsService.openErrorInAuth(err.status, err.error.error.errors[0].message);
      return throwError(err);
    })
    )
  }

  signUp(info: SignUpInfo): Observable<any> {
    return this.http.post<any>(this.signupUrl, info, httpOptions).pipe(map(res => {
      return res;
    }), catchError((err) => {
      this.errorsService.openErrorInAuth(err.status, err.error.error.errors[0].message);
      return throwError(err)
    }));
  }
}
