import { Injectable, computed, signal } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly tokenSignal = signal<string | null>(null);
  private readonly emailSignal = signal<string | null>(null);
  private readonly userIdSignal = signal<string | null>(null);

  readonly isLoggedIn = computed(() => !!this.tokenSignal());
  readonly email = this.emailSignal.asReadonly();

  constructor(private tokenStorage: TokenStorageService) {
    this.syncFromStorage();
  }

  syncFromStorage(): void {
    const token = this.tokenStorage.getToken();
    this.tokenSignal.set(token);
    this.emailSignal.set(this.tokenStorage.getUserEmail());

    const storedUserId = this.tokenStorage.getUserId();
    const userId = storedUserId ?? (token ? this.extractUserIdFromToken(token) : null);
    if (userId && !storedUserId) {
      this.tokenStorage.saveUserId(userId);
    }
    this.userIdSignal.set(userId);
  }

  setSession(token: string, email: string, userId: string): void {
    this.tokenStorage.saveToken(token);
    this.tokenStorage.saveUserEmail(email);
    this.tokenStorage.saveUserId(userId);
    this.tokenSignal.set(token);
    this.emailSignal.set(email);
    this.userIdSignal.set(userId);
  }

  clearSession(): void {
    this.tokenStorage.signOut();
    this.tokenSignal.set(null);
    this.emailSignal.set(null);
    this.userIdSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  getUserId(): string | null {
    const userId = this.userIdSignal();
    if (userId) {
      return userId;
    }

    const token = this.tokenSignal();
    if (!token) {
      return null;
    }

    const extractedUserId = this.extractUserIdFromToken(token);
    if (extractedUserId) {
      this.tokenStorage.saveUserId(extractedUserId);
      this.userIdSignal.set(extractedUserId);
    }
    return extractedUserId;
  }

  private extractUserIdFromToken(token: string): string | null {
    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return null;
      }

      const payload = JSON.parse(this.decodeBase64Url(payloadPart)) as {
        user_id?: string;
      };
      return payload.user_id ?? null;
    } catch {
      return null;
    }
  }

  private decodeBase64Url(value: string): string {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    return atob(base64 + padding);
  }
}
