import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(): boolean {
    const loggedIn = this.localStorageService.getItem('loggedInUser');
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
