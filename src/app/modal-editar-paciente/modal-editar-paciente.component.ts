import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-editar-paciente',
  standalone: true,
  templateUrl: './modal-editar-paciente.component.html',
  styleUrls: ['./modal-editar-paciente.component.scss'],
  imports: [ReactiveFormsModule]
})
export class ModalEditarPacienteComponent implements OnInit {
  @Input() patient: any;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      genero: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', [Validators.required, Validators.maxLength(20)]],
      estadoCivil: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)]],
      email: ['', [Validators.email]],
      naturalidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      contatoEmergencia: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)]],
      alergias: [''],
      cuidadosEspecificos: [''],
      convenio: [''],
      numeroConvenio: [''],
      validadeConvenio: [''],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        pontoReferencia: ['']
      })
    });
  }

  ngOnInit(): void {
    if (this.patient) {
      this.editForm.patchValue(this.patient);
    }
  }

  

  onSubmit(): void {
    if (this.editForm.valid) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const updatedPacientes = pacientes.map((p: any) => p.id === this.patient.id ? { ...this.patient, ...this.editForm.value } : p);
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
      alert('Paciente atualizado com sucesso');
      this.router.navigate(['/inicio']);
    }
  }
}