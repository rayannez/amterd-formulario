import { SelectOption } from "../interfaces/select-option.interface";

  export const CIVIL_STATUS_OPTIONS: ReadonlyArray<SelectOption> = [
    { label: 'Selecione...', value: '' },
    { label: 'Solteiro(a)', value: 'SOLTEIRO' },
    { label: 'Casado(a)', value: 'CASADO' },
    { label: 'União Estável', value: 'UNIAO_ESTAVEL' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO' },
    { label: 'Separado(a)', value: 'SEPARADO' },
    { label: 'Viúvo(a)', value: 'VIUVO' }
  ];

  export const GENDER_OPTIONS: ReadonlyArray<SelectOption> = [
    { label: 'Selecione...', value: '' },
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' }
  ];

  export const UF_OPTIONS: ReadonlyArray<SelectOption> = [
    { label: 'AC', value: 'AC' },
    { label: 'AL', value: 'AL' },
    { label: 'AP', value: 'AP' },
    { label: 'AM', value: 'AM' },
    { label: 'BA', value: 'BA' },
    { label: 'CE', value: 'CE' },
    { label: 'DF', value: 'DF' },
    { label: 'ES', value: 'ES' },
    { label: 'GO', value: 'GO' },
    { label: 'MA', value: 'MA' },
    { label: 'MT', value: 'MT' },
    { label: 'MS', value: 'MS' },
    { label: 'MG', value: 'MG' },
    { label: 'PA', value: 'PA' },
    { label: 'PB', value: 'PB' },
    { label: 'PR', value: 'PR' },
    { label: 'PE', value: 'PE' },
    { label: 'PI', value: 'PI' },
    { label: 'RJ', value: 'RJ' },
    { label: 'RN', value: 'RN' },
    { label: 'RS', value: 'RS' },
    { label: 'RO', value: 'RO' },
    { label: 'RR', value: 'RR' },
    { label: 'SC', value: 'SC' },
    { label: 'SP', value: 'SP' },
    { label: 'SE', value: 'SE' },
    { label: 'TO', value: 'TO' }
  ];

  export const ISSUING_AUTHORITIES: ReadonlyArray<SelectOption> = [
    { label: 'SSP', value: 'SSP' },
    { label: 'SDS', value: 'SDS' },
    { label: 'PC', value: 'PC' },
    { label: 'DETRAN', value: 'DETRAN' },
    { label: 'PM', value: 'PM' },
    { label: 'PF', value: 'PF' },
    { label: 'PRF', value: 'PRF' },
    { label: 'IFP', value: 'IFP' },
    { label: 'ITEP', value: 'ITEP' },
    { label: 'IGP', value: 'IGP' },
    { label: 'IML', value: 'IML' },
    { label: 'Exército', value: 'EXERCITO' },
    { label: 'Marinha', value: 'MARINHA' },
    { label: 'Aeronáutica', value: 'AERONAUTICA' },
    { label: 'Outros', value: 'OUTROS' }
  ];

  export const VALIDATION_MESSAGES = {

    required: 'Campo obrigatório.',

    email: 'E-mail inválido.',

    minLength: 'Quantidade mínima de caracteres.',

    maxLength: 'Quantidade máxima excedida.',

    pattern: 'Formato inválido.'

};
