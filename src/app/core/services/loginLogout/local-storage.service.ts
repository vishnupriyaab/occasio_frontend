import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private loggedInKey = 'isLoggedIn';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  setLoggedIn(status: boolean): void {
    localStorage.setItem(this.loggedInKey, String(status));
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }
}
