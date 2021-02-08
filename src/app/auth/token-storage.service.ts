import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USEREMAIL_KEY = 'AuthEmail';
const USERID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserEmail(email: string) {
    window.sessionStorage.removeItem(USEREMAIL_KEY);
    window.sessionStorage.setItem(USEREMAIL_KEY, email);
  }

  public getUserEmail() {
    return sessionStorage.getItem(USEREMAIL_KEY);
  }

  public getUserId(): any {
    return sessionStorage.getItem(USERID_KEY);
  }
  
  public saveUserId(id: string) {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, id);
  }
}
