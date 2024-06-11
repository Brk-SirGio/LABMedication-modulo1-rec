import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CadastroMedicoComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    const existingUser = this.localStorageService.getItem(this.email);
    if (existingUser) {
      alert('Usuário já cadastrado');
      return;
    }

    const user = { email: this.email, password: this.password };
    this.localStorageService.setItem(this.email, user);
    alert('Cadastro realizado com sucesso');
    this.router.navigate(['/login']);
  }
}
