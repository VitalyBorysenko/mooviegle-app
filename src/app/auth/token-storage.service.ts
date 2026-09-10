import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USEREMAIL_KEY = 'AuthEmail';
const USERID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  signOut(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USEREMAIL_KEY);
    window.sessionStorage.removeItem(USERID_KEY);
  }

  saveToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUserEmail(email: string): void {
    window.sessionStorage.setItem(USEREMAIL_KEY, email);
  }

  getUserEmail(): string | null {
    return sessionStorage.getItem(USEREMAIL_KEY);
  }

  getUserId(): string | null {
    return sessionStorage.getItem(USERID_KEY);
  }

  saveUserId(id: string): void {
    window.sessionStorage.setItem(USERID_KEY, id);
  }
}
