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
import { cepValidator, cpfValidator, rgValidator, telefoneValidator, validarData, validarDataAssinatura, validarNomeCompleto} from '../../shared/validators/field.validator';
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
    numero: ['', Validators.required],
    complemento: [''],
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
    local: ['', Validators.required],
    dataAssinatura: ['', [Validators.required, validarDataAssinatura]],
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
                } else {
                    this.formulario.get('cep')?.setErrors({ cepInvalido: true });
                }
            });
    }
  }
}
