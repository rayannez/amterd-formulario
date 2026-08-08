export interface FormularioInterface {

    nomeCompleto: string;
    nomeMae: string;
    dataNascimento: string;
  
    sexo: string;
    estadoCivil: string;
  
    rg: string;
    orgaoEmissor: string;
    cpf: string;
  
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  
    telefone: string;
    celular: string;
    email: string;
  
    aceitaInclusao: boolean;
    declaraInformacoes: boolean;
    declaraResponsabilidade: boolean;
    autorizaUsoDados: boolean;
  
    local: string;
    dataAssinatura: string;
    assinatura: string;
  
  }