export interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  localId: string;
  refreshToken?: string;
  expiresIn?: string;
}
