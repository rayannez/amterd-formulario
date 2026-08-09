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
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { cepValidator, cpfValidator, rgValidator, telefoneValidator, validarData, validarNomeCompleto} from '../../shared/validators/field.validator';
import { HttpClient } from '@angular/common/http';

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
    MatIconModule,
    MatCardModule,
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
  private readonly http = inject(HttpClient);
  isSubmitting = false;
  enviadoComSucesso = false;
  envioComErro = false;
  
  readonly formulario = this.fb.nonNullable.group({
    nomeCompleto: ['', [
      Validators.required,
      Validators.minLength(5),
      validarNomeCompleto
    ]],
    nomeMae: ['', [
      Validators.required,
      Validators.minLength(5),
      validarNomeCompleto
    ]],
    dataNascimento: ['', [Validators.required, validarData]],
    sexo: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    rg: ['', [Validators.required, rgValidator()]],
    orgaoEmissor: ['', Validators.required],
    cpf: ['', [
      Validators.required,
      cpfValidator()
    ]],
    endereco: ['', Validators.required],
    semNumero: [false],
    numero: ['', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]+$/)
    ]],
    complemento: ['', [Validators.maxLength(50)]],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', Validators.required],
    cep: ['', [
      Validators.required,
      cepValidator()
    ]],
    telefone: ['', [Validators.required, telefoneValidator()]],
    celular: ['', [telefoneValidator()]],
    email: ['', Validators.email],
    aceitaInclusao: [false, Validators.requiredTrue],
    declaraInformacoes: [false, Validators.requiredTrue],
    declaraResponsabilidade: [false, Validators.requiredTrue],
    autorizaUsoDados: [false, Validators.requiredTrue],
    local: ['', [Validators.required, Validators.maxLength(100)]],
    dataAssinatura: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
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
    this.envioComErro = false;

    this.formService
        .enviarFormulario(data)
        .subscribe({
            next: () => {
                this.enviadoComSucesso = true;
                this.formulario.reset();
                this.isSubmitting = false;
            },

            error: (error) => {
                console.error(
                    'Erro ao enviar inscrição:',
                    error
                );

                this.envioComErro = true;
                this.isSubmitting = false;
            }
        });
    }

  onCepBlur(): void {
      const cep = this.formulario.get('cep')?.value?.replace(/\D/g, '');
      if (cep?.length === 8) {
          this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
              .subscribe(data => {
                  if (!data.erro) {
                      this.formulario.patchValue({
                          endereco: data.logradouro,
                          bairro: data.bairro,
                          cidade: data.localidade,
                          uf: data.uf
                      });
                      this.formulario.controls.uf.disable();
                  } else {
                      this.formulario.get('cep')?.setErrors({ cepInvalido: true });
                  }
              });
      }
  }

  onSemNumero(event: any): void {
    if (event.checked) {
        this.formulario.controls.numero.setValue('S/N');
        this.formulario.controls.numero.disable();
    } else {
        this.formulario.controls.numero.setValue('');
        this.formulario.controls.numero.enable();
    }
  }

}
