import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-paciente',
  templateUrl: './detalhes-paciente.component.html',
  styleUrls: ['./detalhes-paciente.component.scss'],
  standalone: true,
  imports: [CommonModule]
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.patient = pacientes.find((p: any) => p.id === this.patientId) || this.patient;
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
