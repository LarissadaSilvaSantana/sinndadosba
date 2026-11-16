import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  login(email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === 'associado@sindados.org.br' && password === '123456') {
      this.isLoggedIn = true;
      return true;
    }

    this.isLoggedIn = false;
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
