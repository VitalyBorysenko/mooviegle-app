export class AuthLoginInfo {
  email: string;
  password: string;
  returnSecureToken: boolean;

  constructor(email: string, password: string, returnSecureToken: boolean) {
    this.email = email;
    this.password = password;
    this.returnSecureToken = returnSecureToken;
  }
}