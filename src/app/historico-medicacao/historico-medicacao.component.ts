import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-historico-medicacao',
  templateUrl: './historico-medicacao.component.html',
  styleUrls: ['./historico-medicacao.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ToolbarComponent] 
})
export class HistoricoMedicacaoComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  allMedications: any[] = [];
  filteredMedications: any[] = [];

  constructor(private router: Router, private titleService: TitleService) {} 

  ngOnInit() {
    this.loadAllMedications();
    this.titleService.setTitle('Histórico de medicações');
  }

  loadAllMedications() {
    const patients = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.allMedications = patients.flatMap((patient: any) => {
      return patient.medicamentos.map((medicamento: any) => ({
        ...medicamento,
        pacienteId: patient.id,
        pacienteNome: patient.nomeCompleto
      }));
    });
    this.filteredMedications = this.allMedications.slice();
    this.orderMedicationsByDate();
  }

  onSearch() {
    if (this.searchTerm) {
      this.searchResults = this.allMedications.filter((record: any) =>
        record.pacienteNome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredMedications = this.searchResults;
    } else {
      this.filteredMedications = this.allMedications.slice();
    }
    this.orderMedicationsByDate();
  }

  orderMedicationsByDate() {
    this.filteredMedications.sort((a: any, b: any) => {
      const dateA = new Date(`${a.data}T${a.hora}`).getTime();
      const dateB = new Date(`${b.data}T${b.hora}`).getTime();
      return dateB - dateA;
    });
  }

  viewPatientDetails(patientId: string) {
    this.router.navigate(['/detalhes-paciente', patientId]);
  }
}
