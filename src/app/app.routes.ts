import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DetalhesPacienteComponent } from './detalhes-paciente/detalhes-paciente.component';
import { HistoricoMedicacaoComponent } from './historico-medicacao/historico-medicacao.component';
import { CadastroMedicamentoComponent } from './cadastro-medicamento/cadastro-medicamento.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'cadastro-medico', loadComponent: () => import('./cadastro-medico/cadastro-medico.component').then(m => m.CadastroMedicoComponent) },
  { path: 'inicio', loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent), canActivate: [AuthGuard] },
  { path: 'cadastro-paciente', loadComponent: () => import('./cadastro-paciente/cadastro-paciente.component').then(m => m.CadastroPacienteComponent), canActivate: [AuthGuard] },
  { path: 'cadastro-medicamento', component: CadastroMedicamentoComponent, canActivate: [AuthGuard] },
  { path: 'historico-medicacao', component: HistoricoMedicacaoComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-paciente/:id', component: DetalhesPacienteComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
