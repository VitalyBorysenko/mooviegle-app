import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(
    public _snackBar: MatSnackBar,
  ) { }

  openErrorInAuth(status: number, error?: string | undefined) {
    if (status == 401) {
      if (error == "Auth token is expired") {
        this._snackBar.open('Час сеансу закінчився', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
    if (status == 400) {
      if (error === "EMAIL_NOT_FOUND") {
        this._snackBar.open('Електронна адреса не знайдена', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      if (error === "INVALID_PASSWORD") {
        this._snackBar.open('Невірний пароль', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      if (error === "EMAIL_EXISTS") {
        this._snackBar.open('Email вже зареєстрований', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      if (error === "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
        this._snackBar.open('Ліміт спроб вичерпано. Спробуйте пізніше', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
  }
}
