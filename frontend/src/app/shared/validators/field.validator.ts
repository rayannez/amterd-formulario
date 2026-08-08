  import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
  } from '@angular/forms';
  import { cpf } from 'cpf-cnpj-validator';

  export function cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;
        return cpf.isValid(control.value) ? null : { cpfInvalido: true };
    };
}
  
  export function cepValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
  
      const cep = String(value).replace(/\D/g, '');
  
      if (cep.length !== 8) {
        return { cepInvalido: true };
      }
  
      return null;
    };
  }
  
  
  export function rgValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;

        const rg = String(value).replace(/\D/g, '');

        if (rg.length < 7 || rg.length > 10) {
            return { rgInvalido: true };
        }

        // Rejeita sequências repetidas ex: 1111111
        const sequencia = rg.split('').every((d: string) => d === rg[0]);
        if (sequencia) {
            return { rgInvalido: true };
        }

        return null;
    };
}

  export function validarData(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const data = new Date(control.value);
    const hoje = new Date();
    const minima = new Date('1900-01-01');

    if (isNaN(data.getTime())) {
        return { dataInvalida: true };
    }
    if (data > hoje) {
        return { dataFutura: true };
    }
    if (data < minima) {
        return { dataMinima: true };
    }

    return null;
}

export function telefoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const telefone = control.value.replace(/\D/g, '');

      if (telefone.length !== 10 && telefone.length !== 11) {
          return { telefoneInvalido: true };
      }

      // Valida DDD (11 a 99)
      const ddd = parseInt(telefone.substring(0, 2));
      if (ddd < 11 || ddd > 99) {
          return { telefoneInvalido: true };
      }

      // Celular deve começar com 9
      if (telefone.length === 11 && telefone[2] !== '9') {
          return { telefoneInvalido: true };
      }

      // Rejeita sequências repetidas ex: 99999999999
      const sequencia = telefone.split('').every((d: string) => d === telefone[0]);
      if (sequencia) {
          return { telefoneInvalido: true };
      }

      return null;
  };
}

export function validarNomeCompleto(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const partes = control.value.trim().split(/\s+/);
  return partes.length >= 2 ? null : { nomeIncompleto: true };
}

export function validarDataAssinatura(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const data = new Date(control.value);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (isNaN(data.getTime())) {
      return { dataInvalida: true };
  }
  if (data < hoje) {
      return { dataPassada: true };
  }

  return null;
}