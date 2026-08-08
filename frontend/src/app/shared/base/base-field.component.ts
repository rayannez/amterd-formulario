import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldErrorMessages } from '../interfaces/error.interface';


@Directive()
export abstract class BaseFieldComponent {

  readonly control = input.required<FormControl>();

  readonly label = input.required<string>();

  readonly required = input(false);

  readonly errorMessages = input<FieldErrorMessages>({});

  protected readonly defaultMessages: Required<FieldErrorMessages> = {
    required: 'Campo obrigatório.',
    email: 'E-mail inválido.',
    minlength: 'Quantidade mínima de caracteres não atingida.',
    maxlength: 'Quantidade máxima de caracteres excedida.',
    pattern: 'Formato inválido.',
    cpfInvalido: 'CPF inválido.',
    cepInvalido: 'CEP inválido.',
    rgInvalido: 'RG inválido.',
    telefoneInvalido: 'Telefone inválido. Use DDD + número (10 ou 11 dígitos).',
    dataInvalida: 'Data inválida.',
    dataFutura: 'O associado deve ter pelo menos 18 anos.',
    dataMinima: 'Data muito antiga.',
    nomeIncompleto: 'Informe o nome e sobrenome.',
    dataPassada: 'A data não pode ser anterior a hoje.',
};

private readonly errorMap: Record<string, keyof FieldErrorMessages> = {
    required: 'required',
    email: 'email',
    minlength: 'minlength',
    maxlength: 'maxlength',
    pattern: 'pattern',
    cpfInvalido: 'cpfInvalido',
    cepInvalido: 'cepInvalido',
    rgInvalido: 'rgInvalido',
    telefoneInvalido: 'telefoneInvalido',
    dataInvalida: 'dataInvalida',
    dataFutura: 'dataFutura',
    dataMinima: 'dataMinima',
    nomeIncompleto: 'nomeIncompleto',
    dataPassada: 'dataPassada',
};
  
  getErrorMessage(): string {
  
    const control = this.control();
    const messages = {
      ...this.defaultMessages,
      ...this.errorMessages()
    };
  
    for (const [errorKey, messageKey] of Object.entries(this.errorMap)) {
      if (control.hasError(errorKey)) {
        return messages[messageKey];
      }
    }
  
    return '';
  
  }

  hasError(): boolean {

    const control = this.control();

    return control.invalid && (control.dirty || control.touched);

  }

}