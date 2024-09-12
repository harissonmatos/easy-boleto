const path = require('path');
const utils = require('../../utils/utils');
const pad = utils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');
const GeradorDeDigitoPadrao = require('../gerador-de-digito-padrao');

const NUMERO_CAIXA = '104';
const DIGITO_CAIXA = '0';

class Caixa {

	getTitulos() {//OK
		return {
			instrucoes: 'Instruções (texto de responsabilidade do beneficiário)',
			nomeDoPagador: 'Nome do Pagador',
			especie: 'Espécie Moeda',
			quantidade: 'Quantidade Moeda',
			valor: 'xValor'
		};
	};

	exibirReciboDoPagadorCompleto() {//OK
		return true;
	};

	exibirCampoCip() {//OK
		return false;
	};

	geraCodigoDeBarrasPara(boleto) {//OK
		var beneficiario = boleto.getBeneficiario(),
			carteira = beneficiario.getCarteira(),
			contaCorrente = pad(beneficiario.getCodigoBeneficiario(), 6, '0'),
			nossoNumeroFormatado = this.getNossoNumeroFormatado(beneficiario),
			campoLivre = [];

		if (carteira == '14' || carteira == '24') {
			// Carteira 24 é sem registro e carteira 14 é com registro
			// O número 1 significa com registro e o número 2 sem registro

			campoLivre.push(contaCorrente);
			campoLivre.push(beneficiario.getDigitoCodigoBeneficiario());
			campoLivre.push(nossoNumeroFormatado.substring(2, 5));
			campoLivre.push(nossoNumeroFormatado.substring(0, 1));
			campoLivre.push(nossoNumeroFormatado.substring(5, 8));
			campoLivre.push(nossoNumeroFormatado.substring(1, 2));
			campoLivre.push(nossoNumeroFormatado.substring(8));

			var digito = GeradorDeDigitoPadrao.mod11(campoLivre.join(''), {
				de: [0, 10, 11],
				para: 0
			});

			campoLivre.push(digito);
		} else {
			throw new Error('Carteira "', carteira, '" não implementada para o banco Caixa');
		}

		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	getNumeroFormatadoComDigito() {//OK
		return [NUMERO_CAIXA, DIGITO_CAIXA].join('-');
	};

	getCarteiraFormatado(beneficiario) {//OK
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	getCarteiraTexto(beneficiario) {//OK
		return {
			1: 'RG',
			14: 'RG',
			2: 'SR',
			24: 'SR'
		}[beneficiario.getCarteira()];
	};

	getCodigoFormatado(beneficiario) {//OK
		return pad(beneficiario.getCodigoBeneficiario(), 5, '0');
	};

	getImagem() {//OK
		return path.join(__dirname, 'logotipos/caixa-economica-federal.png');
	};

	getNossoNumeroFormatado(beneficiario) {//OK
		return [
			pad(beneficiario.getCarteira(), 2, '0'),
			pad(beneficiario.getNossoNumero(), 15, '0')
		].join('');
	};

	getNossoNumeroECodigoDocumento(boleto) {//OK
		var beneficiario = boleto.getBeneficiario();

		return [
			this.getNossoNumeroFormatado(beneficiario),
			beneficiario.getDigitoNossoNumero()
		].join('-');
	};

	getNumeroFormatado() {//OK
		return NUMERO_CAIXA;
	};

	getNome() {//OK
		return 'Caixa Econômica Federal S/A';
	};

	getImprimirNome() {//OK
		return false;
	};

	getAgenciaECodigoBeneficiario(boleto) {
		var beneficiario = boleto.getBeneficiario(),

			codigo = this.getCodigoFormatado(beneficiario),
			digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

		if (digitoCodigo) {
			codigo += '-' + digitoCodigo;
		}

		return beneficiario.getAgenciaFormatada() + '/' + codigo;
	};

	novoCaixa() {
		return new Caixa();
	};

}

module.exports = Caixa;
