import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStateService } from './auth-state.service';

export const authGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);

  if (authState.isLoggedIn()) {
    return true;
  }

  inject(MatSnackBar).open('Увійдіть, щоб переглянути колекцію', 'Х', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
  inject(Router).navigate(['/']);
  return false;
};
