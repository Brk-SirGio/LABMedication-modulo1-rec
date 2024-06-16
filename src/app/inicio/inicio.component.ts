import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TitleService } from '../services/title.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  searchTerm: string = '';
  filteredPatients: any[] = [];
  totalPacientes: number = 0;
  totalMedicamentos: number = 0;

  constructor(private router: Router ,private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Início');
    this.loadPatients();
    this.calculateStatistics();
  }

  loadPatients() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.filteredPatients = pacientes;
  }

  calculateStatistics() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.totalPacientes = pacientes.length;
    this.totalMedicamentos = pacientes.reduce((total: number, paciente: any) => total + (paciente.medicamentos ? paciente.medicamentos.length : 0), 0);
  }

  onSearch() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.filteredPatients = pacientes.filter((patient: any) => 
      patient.nomeCompleto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.telefone.includes(this.searchTerm) ||
      patient.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewPatientDetails(patient: any) {
    this.router.navigate(['/detalhes-paciente', patient.id]);
  }

  calculateAge(birthdate: string): number {
    const birthDate = new Date(birthdate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


}
