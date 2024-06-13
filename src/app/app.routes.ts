import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'cadastro-medico', loadComponent: () => import('./cadastro-medico/cadastro-medico.component').then(m => m.CadastroMedicoComponent) },
  { path: 'inicio', loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent), canActivate: [AuthGuard] },
  { path: 'cadastro-paciente', loadComponent: () => import('./cadastro-paciente/cadastro-paciente.component').then(m => m.CadastroPacienteComponent), canActivate: [AuthGuard] },
  { path: 'cadastro-medicamento', loadComponent: () => import('./cadastro-medicamento/cadastro-medicamento.component').then(m => m.CadastroMedicamentoComponent), canActivate: [AuthGuard] },
  { path: 'historico-medicacao', loadComponent: () => import('./historico-medicacao/historico-medicacao.component').then(m => m.HistoricoMedicacaoComponent), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);