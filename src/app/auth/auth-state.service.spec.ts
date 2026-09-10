import { TestBed } from '@angular/core/testing';
import { AuthStateService } from './auth-state.service';

describe('AuthStateService', () => {
  let service: AuthStateService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStateService);
  });

  it('should start logged out', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should store session data', () => {
    service.setSession('token', 'user@test.com', '123');
    expect(service.isLoggedIn()).toBe(true);
    expect(service.email()).toBe('user@test.com');
    expect(service.getUserId()).toBe('123');
  });

  it('should clear session', () => {
    service.setSession('token', 'user@test.com', '123');
    service.clearSession();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should restore user id from token when storage is empty', () => {
    const tokenPayload = btoa(JSON.stringify({ user_id: 'uid-from-token' }));
    const token = `header.${tokenPayload}.signature`;

    sessionStorage.setItem('AuthToken', token);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStateService);

    expect(service.getUserId()).toBe('uid-from-token');
  });
});
