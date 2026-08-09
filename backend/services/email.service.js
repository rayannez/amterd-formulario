const { Resend } = require('resend');
const fs = require('fs');

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarFormularioPorEmail(pdfPath, dados) {
    const pdfBuffer = fs.readFileSync(pdfPath);

    const { data, error } = await resend.emails.send({
        from: 'AMTERD <onboarding@resend.dev>',
        to: process.env.EMAIL_DESTINO,
        subject: 'Nova Ficha de Inscrição - AMTERD',
        text: `
            Nova ficha de inscrição recebida.
            Nome: ${dados.nomeCompleto}
            CPF: ${dados.cpf}
            E-mail: ${dados.email || 'Não informado'}
        `,
        attachments: [
            {
                filename: `ficha-inscricao-${dados.nomeCompleto?.replace(/\s+/g, '-').toLowerCase().slice(0, 30)}.pdf`,
                content: pdfBuffer
            }
        ]
    });

    if (error) throw new Error(error.message);

    console.log('E-mail enviado:', data);
    return data;
}

module.exports = { enviarFormularioPorEmail };