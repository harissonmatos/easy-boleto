const { BankConfigs, Boletos, StreamToPromise } = require('../lib/index');
const QRCode = require('qrcode');

const boleto = {
    banco: new BankConfigs('Banco do Brasil'), // Mesmo boleto, só mudar logo
    // banco: new BankConfigs('Itau'), // Mesmo boleto, só mudar logo
    pagador: {
        nome: 'José Bonifácio de Andrada',
        registroNacional: '11563458712',
        endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
        }
    },
    instrucoes: [
        'Após o vencimento Mora dia R$ 1,59',
        'Após o vencimento, multa de 2%',
        'Outra linha 1 skjdhjasg  asgdhgas hqiuwvbvs agvhg asf has dgf çaá?!*#$ asjhj gashg saghasg',
        'Outra linha 2',
        'Outra linha 3 asgdhasg dghg asdhgashdg hasgdh asgd hgas hdgashd hasgd hasg  asgdhasghdgashfdghfgtt jhdsgjghhgh agh ',
    ],
    beneficiario: {
        nome: 'Empresa Fictícia LTDA',
        cnpj: '43.576.788/0001-91',
        dadosBancarios: {
            carteira: '17',
            agencia: '4559-X',
            conta: '115737-X',
            nossoNumero: '22219670000000007'
        },
        endereco: {
            logradouro: 'Rua Pedro Lessa, 15',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            estadoUF: 'RJ',
            cep: '20030-030'
        }
    },
    boleto: {
        numeroDocumento: '6',
        especieDocumento: 'DM',
        valor: 125448.54,
        linhaDigitavel: '00190000090222196700900000007179998810000000100',
        codigoBarras: '00199988100000001000000002221967000000000717',
        pixQrCode: '00020101021226900014br.gov.bcb.pix2568qrcodepix.bb.com.br/pix/v2/cobv/d02d51b4-c363-44b4-84a7-726b1cd3cd3552040000530398654041.005802BR5925SORVEDOCES INDUSTRIA E CO6010VILA VELHA62070503***6304B3A4',
        datas: {
            vencimento: '22-04-2025',
            processamento: '25-10-2024',
            documentos: '25-10-2024'
        }
    }
};


const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async ({ stream }) => {
    // ctx.res.set('Content-type', 'application/pdf');	
    await streamToPromise(stream);
}).catch((error) => {
    return error;
});
