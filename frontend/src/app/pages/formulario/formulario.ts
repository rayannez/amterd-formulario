import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CIVIL_STATUS_OPTIONS, GENDER_OPTIONS, ISSUING_AUTHORITIES, UF_OPTIONS } from '../../shared/constants/fields-form.constant';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../shared/material/material';
import { SelectFieldComponent } from '../../shared/components/select-field/select-field';
import { InputFieldComponent } from '../../shared/components/input-field/input-field';
import { CheckboxFieldComponent } from '../../shared/components/checkbox-field/checkbox-field';
import { FormSectionComponent } from '../../shared/components/form-section/form-section';
import { FormularioService } from '../../services/formularioService';
import { FormularioInterface } from '../../shared/interfaces/formulario.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { cepValidator, cpfValidator, rgValidator } from '../../shared/validators/field.validator';

@Component({
  selector: 'app-formulario',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectFieldComponent,
    InputFieldComponent,
    CheckboxFieldComponent,
    FormSectionComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    MATERIAL_MODULES
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  readonly selectOptions = {
    gender: GENDER_OPTIONS,
    civilStatus: CIVIL_STATUS_OPTIONS,
    uf: UF_OPTIONS,
    issuingAuthority: ISSUING_AUTHORITIES
  };

  private readonly fb = inject(FormBuilder);
  private readonly formService = inject(FormularioService);
  isSubmitting = false;

  
  readonly formulario = this.fb.nonNullable.group({
    nomeCompleto: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    nomeMae: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    dataNascimento: ['', Validators.required],
    sexo: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    rg: ['', Validators.required, rgValidator()],
    orgaoEmissor: ['', Validators.required],
    cpf: ['', [
      Validators.required,
      cpfValidator()
    ]],
    endereco: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', Validators.required],
    cep: ['', [
      Validators.required,
      cepValidator()
    ]],
    telefone: ['', Validators.required],
    celular: [''],
    email: ['', Validators.email],
    aceitaInclusao: [false, Validators.requiredTrue],
    declaraInformacoes: [false, Validators.requiredTrue],
    declaraResponsabilidade: [false, Validators.requiredTrue],
    autorizaUsoDados: [false, Validators.requiredTrue],
    local: ['', Validators.required],
    dataAssinatura: ['', Validators.required],
    assinatura: ['', Validators.required]
  });
  
  enviarFormulario(): void {
    if (this.isSubmitting) {
        return;
    }

    if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        return;
    }

    const data: FormularioInterface =
        this.formulario.getRawValue();

    this.isSubmitting = true;

    this.formService
        .enviarFormulario(data)
        .subscribe({
            next: (response) => {
                alert(
                    'Inscrição enviada com sucesso.'
                );
                this.formulario.reset();
                this.isSubmitting = false;
            },
            error: (error) => {
                console.error(
                    'Erro ao enviar inscrição:',
                    error
                );
                alert(
                    'Erro ao enviar inscrição. Tente novamente.'
                );
                this.isSubmitting = false;
            }
        });
    }
}
