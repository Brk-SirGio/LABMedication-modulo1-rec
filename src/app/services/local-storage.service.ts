import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability();
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } else {
      console.error('Local Storage is not available.');
      return null;
    }
  }

  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('Local Storage is not available.');
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    } else {
      console.error('Local Storage is not available.');
    }
  }
}
