import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
  } from '@angular/forms';
  
  export function cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
  
      const cpf = String(value).replace(/\D/g, '');
  
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return { cpfInvalido: true };
      }
  
      let soma = 0;
  
      for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
      }
  
      let resto = soma % 11;
      const primeiroDigito = resto < 2 ? 0 : 11 - resto;
  
      if (primeiroDigito !== Number(cpf[9])) {
        return { cpfInvalido: true };
      }
  
      soma = 0;
  
      for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
      }
  
      resto = soma % 11;
      const segundoDigito = resto < 2 ? 0 : 11 - resto;
  
      if (segundoDigito !== Number(cpf[10])) {
        return { cpfInvalido: true };
      }
  
      return null;
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
  
      if (!value) {
        return null;
      }
  
      const rg = String(value).replace(/\D/g, '');
  
      if (rg.length < 7 || rg.length > 10) {
        return { rgInvalido: true };
      }
  
      return null;
    };
  }