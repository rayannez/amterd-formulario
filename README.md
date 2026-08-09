# AMTERD — Formulário de Inscrição

Sistema web desenvolvido para digitalizar o processo de inscrição de associados da AMTERD.

A aplicação permite que o associado preencha a ficha de inscrição online, tenha os dados validados, gere automaticamente uma ficha em PDF e envie o documento por e-mail para a associação.

## ✨ Funcionalidades

- Formulário digital de inscrição de associado
- Validação dos campos obrigatórios
- Validação de formatos como:
  - CPF
  - RG
  - CEP
  - telefone
  - e-mail
- Máscaras para campos de documentos e contato
- Seleção de estado civil, sexo, UF e órgão emissor
- Declarações e autorizações através de checkboxes obrigatórios
- Informações sobre pagamento da mensalidade
- Geração automática do PDF preenchido
- Inclusão da identidade visual da AMTERD no PDF
- Envio do PDF por e-mail
- Tela de carregamento durante o envio
- Tela de sucesso após o envio
- Tela de erro caso ocorra algum problema no processamento
- Preservação dos dados preenchidos caso ocorra uma falha no envio

---

## 🏗️ Arquitetura

O projeto é dividido em duas aplicações principais:

```text
amterd-formulario/
│
├── frontend/
│   └── Angular
│
├── backend/
│   └── Node.js + Express
│
└── README.md
