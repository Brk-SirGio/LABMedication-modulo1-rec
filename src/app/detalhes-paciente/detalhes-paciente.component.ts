import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TitleService } from '../services/title.service';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { ModalEditarPacienteComponent } from '../modal-editar-paciente/modal-editar-paciente.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-paciente',
  templateUrl: './detalhes-paciente.component.html',
  styleUrls: ['./detalhes-paciente.component.scss'],
  standalone: true,
  imports: [CommonModule, ToolbarComponent, MenuLateralComponent, ModalEditarPacienteComponent, MatIconModule]
})
export class DetalhesPacienteComponent implements OnInit {
  patientId: string | null = null;
  patient: any = {
    nomeCompleto: '',
    convenio: '',
    contatoEmergencia: '',
    alergias: [],
    cuidadosEspecificos: [],
    medicamentos: []
  };
  showEditModal: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Detalhamento Paciente');
    this.patientId = this.route.snapshot.paramMap.get('id');
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.patient = pacientes.find((p: any) => p.id === this.patientId) || this.patient;
  }

  openEditModal(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.ngOnInit();
  }

  deletePaciente(): void {
    if (confirm('Tem certeza que deseja deletar este paciente?')) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const updatedPacientes = pacientes.filter((p: any) => p.id !== this.patientId);
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
      alert('Paciente deletado com sucesso');
      this.router.navigate(['/inicio']);
    }
  }

  editMedicamento(medicamento: any): void {
    this.router.navigate(['/cadastro-medicamento'], { state: { patient: this.patient } });
  }

  deleteMedicamento(medicamentoId: string): void {
    if (confirm('Tem certeza que deseja deletar este medicamento?')) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const updatedPacientes = pacientes.map((paciente: any) => {
        if (paciente.id === this.patientId) {
          paciente.medicamentos = paciente.medicamentos.filter((m: any) => m.id !== medicamentoId);
        }
        return paciente;
      });
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
      this.patient = updatedPacientes.find((p: any) => p.id === this.patientId) || this.patient;
    }
  }
}
