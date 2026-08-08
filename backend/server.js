
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { gerarPdf } = require('./services/pdf.service');
const {
    enviarFormularioPorEmail
} = require('./services/email.service');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/formulario/enviar', async (req, res) => {

    try {

        const dados = req.body;

        console.log('Formulário recebido:');
        console.log(dados);

        const pdfPath = await gerarPdf(dados);

        console.log('PDF gerado:');
        console.log(pdfPath);

        await enviarFormularioPorEmail(
            pdfPath,
            dados
        );

        console.log('E-mail enviado com sucesso.');

        res.json({
            success: true,
            message: 'Formulário enviado com sucesso.'
        });

    } catch (error) {

        console.error(
            'Erro ao processar formulário:',
            error
        );

        res.status(500).json({
            success: false,
            message: 'Erro ao enviar formulário.'
        });
    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});