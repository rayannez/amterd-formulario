const nodemailer = require('nodemailer');

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD existe:', !!process.env.EMAIL_PASSWORD);
console.log('EMAIL_DESTINO:', process.env.EMAIL_DESTINO);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Erro na autenticação do Gmail:');
        console.error(error);
    } else {
        console.log('Gmail autenticado com sucesso!');
    }
});

async function enviarFormularioPorEmail(pdfPath, dados) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
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
                filename: 'ficha-inscricao.pdf',
                path: pdfPath
            }
        ]
    });

    console.log('E-mail enviado:', info.messageId);
    return info;
}

module.exports = { enviarFormularioPorEmail };