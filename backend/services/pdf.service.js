const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

function checkbox(valor) {
    return valor === true ? '✓' : '';
}

function formatarData(data) {
    if (!data) return '';
    const partes = data.split('-');
    if (partes.length !== 3) return data;
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
}

function formatarSexo(sexo) {
    const options = { M: 'Masculino', F: 'Feminino', O: 'Outro' };
    return options[sexo] || sexo || '';
}

function formatarEstadoCivil(estadoCivil) {
    const options = {
        SOLTEIRO: 'Solteiro',
        CASADO: 'Casado',
        DIVORCIADO: 'Divorciado',
        VIUVO: 'Viúvo',
        SEPARADO: 'Separado',
        UNIAO_ESTAVEL: 'União Estável'
    };
    return options[estadoCivil] || estadoCivil || '';
}

function preencherTemplate(template, dados) {
    return template.replace(/{{\s*([\w]+)\s*}}/g, (match, campo) => {
        if (dados[campo] === undefined || dados[campo] === null) {
            console.warn(`Campo não encontrado no PDF: ${campo}`);
            return '';
        }
        return String(dados[campo]);
    });
}

async function gerarPdf(dados) {
    const templatePath = path.join(__dirname, '../templates/ficha-associado/ficha.html');
    const cssPath = path.join(__dirname, '../templates/ficha-associado/ficha.css');
    const logoPath = path.join(__dirname, '../templates/ficha-associado/logo_amterd.png');

    let html = fs.readFileSync(templatePath, 'utf8');
    const styles = fs.readFileSync(cssPath, 'utf8');
    const logoBase64 = fs.readFileSync(logoPath, 'base64');

    html = html.replace('</head>', `<style>${styles}</style></head>`);

    const dadosPdf = {
        ...dados,
        logo: `data:image/png;base64,${logoBase64}`,
        dataNascimento: formatarData(dados.dataNascimento),
        dataAssinatura: formatarData(dados.dataAssinatura),
        sexo: formatarSexo(dados.sexo),
        estadoCivil: formatarEstadoCivil(dados.estadoCivil),
        aceitaInclusao: checkbox(dados.aceitaInclusao),
        declaraInformacoes: checkbox(dados.declaraInformacoes),
        declaraResponsabilidade: checkbox(dados.declaraResponsabilidade),
        autorizaUsoDados: checkbox(dados.autorizaUsoDados)
    };

    html = preencherTemplate(html, dadosPdf);

    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ],
        headless: true
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const outputPath = path.join(__dirname, '../ficha-preenchida.pdf');

        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
        });

        return outputPath;
    } finally {
        await browser.close();
    }
}

module.exports = { gerarPdf };