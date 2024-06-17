import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TitleService } from '../services/title.service';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-cadastro-medicamento',
  templateUrl: './cadastro-medicamento.component.html',
  styleUrls: ['./cadastro-medicamento.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToolbarComponent, MenuLateralComponent],
})
export class CadastroMedicamentoComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  selectedPatient: any;
  medicamentoForm: FormGroup;
  isEditEnabled: boolean = false;
  tipos = ['Cápsula', 'Comprimido', 'Líquido', 'Creme', 'Gel', 'Inalação', 'Injeção', 'Spray'];
  unidades = ['mg', 'mcg', 'g', 'mL', '%'];

  constructor(private fb: FormBuilder, private titleService: TitleService) {
    this.medicamentoForm = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      data: [new Date().toISOString().substring(0, 10), Validators.required],
      hora: ['', Validators.required],
      tipo: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(0.01)]],
      unidade: ['', Validators.required],
      observacoes: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Cadastro de medicamento');
  }

  onSearch() {
    const patients = JSON.parse(localStorage.getItem('pacientes') || '[]');
    this.searchResults = patients.filter((patient: any) =>
      patient.nomeCompleto.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
    this.searchTerm = patient.nomeCompleto;
    this.searchResults = [];
  }

  onSubmit() {
    if (this.medicamentoForm.valid) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const updatedPacientes = pacientes.map((paciente: any) => {
        if (paciente.id === this.selectedPatient.id) {
          if (!paciente.medicamentos) {
            paciente.medicamentos = [];
          }
          const medicamentoIndex = paciente.medicamentos.findIndex((m: any) => m.id === this.medicamentoForm.value.id);
          if (medicamentoIndex > -1) {
            paciente.medicamentos[medicamentoIndex] = this.medicamentoForm.value;
          } else {
            paciente.medicamentos.push({
              ...this.medicamentoForm.value,
              id: this.generateUniqueId()
            });
          }
          this.selectedPatient.medicamentos = paciente.medicamentos;
        }
        return paciente;
      });
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
      alert('Medicamento salvo com sucesso!');
      this.resetForm();
    }
  }

  resetForm() {
    this.medicamentoForm.reset({
      id: '',
      nome: '',
      data: new Date().toISOString().substring(0, 10),
      hora: '',
      tipo: '',
      quantidade: '',
      unidade: '',
      observacoes: '',
    });
    this.isEditEnabled = false;
  }

  editMedicamento(medicamento: any) {
    this.medicamentoForm.setValue(medicamento);
    this.isEditEnabled = true;
  }

  deleteMedicamento(medicamentoId: string) {
    if (confirm('Tem certeza que deseja deletar este medicamento?')) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const updatedPacientes = pacientes.map((paciente: any) => {
        if (paciente.id === this.selectedPatient.id) {
          paciente.medicamentos = paciente.medicamentos.filter((m: any) => m.id !== medicamentoId);
          this.selectedPatient.medicamentos = paciente.medicamentos;
        }
        return paciente;
      });
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
      alert('Medicamento deletado com sucesso!');
      this.resetForm();
    }
  }
  

  generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}