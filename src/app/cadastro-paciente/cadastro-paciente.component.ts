import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { TitleService } from '../services/title.service';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';


@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  styleUrl: './cadastro-paciente.component.scss',
  templateUrl: './cadastro-paciente.component.html',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ToolbarComponent, MenuLateralComponent]
})
export class CadastroPacienteComponent implements OnInit {
  pacienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient,
    private titleService: TitleService
  ) {
    this.pacienteForm = this.fb.group({
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
      }),
      medicamentos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Cadastro de paciente');
  }

  onSubmit() {
    if (this.pacienteForm.valid) {
      const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
      const paciente = { ...this.pacienteForm.value, id: this.generateId() };
      pacientes.push(paciente);
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
      alert('Cadastro realizado com sucesso');
      this.router.navigate(['/inicio']);
    }
  }

  generateId(): string {
    return 'paciente_' + Math.random().toString(36).substr(2, 9);
  }

  buscaCep() {
    const cep = this.pacienteForm.get('endereco.cep')?.value;
    if (cep) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        this.pacienteForm.patchValue({
          endereco: {
            cidade: data.localidade,
            estado: data.uf,
            logradouro: data.logradouro,
            bairro: data.bairro
          }
        });
      });
    }
  }
}
