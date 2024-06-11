import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'cadastro-medico', loadComponent: () => import('./cadastro-medico/cadastro-medico.component').then(m => m.CadastroMedicoComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
