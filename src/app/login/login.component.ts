import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  onLogin() {
    const user = this.localStorageService.getItem(this.email);
    if (user && user.password === this.password) {
      this.localStorageService.setItem('loggedInUser', user);
      this.router.navigate(['/inicio']);
    } else {
      alert('Email ou senha inválidos');
    }
  }

  onCreateAccount() {
    this.router.navigate(['/cadastro-medico']);
  }

  onForgotPassword() {
    alert('Funcionalidade em construção');
  }
}
