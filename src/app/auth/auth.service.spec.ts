import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { AuthLoginInfo } from './login-info';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should authenticate with email and password', () => {
    const credentials = new AuthLoginInfo('user@test.com', 'password123', true);

    service.auth(credentials).subscribe((response) => {
      expect(response.idToken).toBe('token');
      expect(response.email).toBe('user@test.com');
    });

    const req = httpMock.expectOne(
      `${environment.firebaseAuthBaseUrl}/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
    );
    expect(req.request.method).toBe('POST');
    req.flush({ idToken: 'token', email: 'user@test.com', localId: '123' });
  });
});
