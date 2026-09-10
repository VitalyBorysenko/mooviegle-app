import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthStateService } from '../../auth/auth-state.service';

export const firebaseAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.firebaseDatabaseUrl)) {
    return next(req);
  }

  const token = inject(AuthStateService).getToken();
  if (!token) {
    return next(req);
  }

  const separator = req.url.includes('?') ? '&' : '?';
  return next(req.clone({ url: `${req.url}${separator}auth=${token}` }));
};
