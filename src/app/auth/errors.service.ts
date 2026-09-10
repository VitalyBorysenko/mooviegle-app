import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  constructor(
    public _snackBar: MatSnackBar,
  ) { }

  openErrorInAuth(status: number, error?: string): void {
    if (status === 401 && error === 'Auth token is expired') {
      this._snackBar.open('Час сеансу закінчився', 'Х', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    if (status === 400) {
      if (error === 'EMAIL_NOT_FOUND') {
        this._snackBar.open('Електронна адреса не знайдена', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }

      if (error === 'INVALID_PASSWORD') {
        this._snackBar.open('Невірний пароль', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }

      if (error === 'EMAIL_EXISTS') {
        this._snackBar.open('Email вже зареєстрований', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }

      if (error?.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
        this._snackBar.open('Ліміт спроб вичерпано. Спробуйте пізніше', 'Х', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }
    }

    this._snackBar.open('Помилка авторизації. Спробуйте ще раз', 'Х', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
