const path = require('path');
const utils = require('../../utils/utils');
const pad = utils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

const NUMERO_BANCO_BRASIL = '001';
const DIGITO_BANCO_BRASIL = '9';

class BancoBrasil {

	getTitulos() {
		return {
			instrucoes: 'Informações de responsabilidade do beneficiário',
			nomeDoPagador: 'Nome do Pagador',
			especie: 'Moeda',
			quantidade: 'Quantidade',
			valor: 'Valor',
			moraMulta: '(+) Juros / Multa'
		};
	};

	exibirReciboDoPagadorCompleto() {
		return true;
	};

	exibirCampoCip() {
		return false;
	};

	geraCodigoDeBarrasPara(boleto) {
		const beneficiario = boleto.getBeneficiario();

		const campoLivre = [];

		if (beneficiario.getNossoNumero().length == 11) {
			campoLivre.push(beneficiario.getNossoNumero());
			campoLivre.push(beneficiario.getAgenciaFormatada());
			campoLivre.push(beneficiario.getCodigoBeneficiario());
			campoLivre.push(beneficiario.getCarteira().substring(0, 2));


		}

		if (beneficiario.getNossoNumero().length == 17) {
			campoLivre.push('000000');
			campoLivre.push(beneficiario.getNossoNumero());
			campoLivre.push(beneficiario.getCarteira().substring(0, 2));
		}


		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	getNumeroFormatadoComDigito() {
		return [
			NUMERO_BANCO_BRASIL,
			DIGITO_BANCO_BRASIL
		].join('-');
	};

	getNumeroFormatado() {
		return NUMERO_BANCO_BRASIL;
	};

	getCarteiraFormatado(beneficiario) {
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	getCarteiraTexto(beneficiario) {
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	getCodigoFormatado(beneficiario) {
		return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
	};

	getImagem() {
		return path.join(__dirname, 'logotipos/banco-do-brasil.png');
	};

	getNossoNumeroFormatado(beneficiario) {
		return pad(beneficiario.getNossoNumero(), 17, '0');
	};

	getNossoNumeroECodigoDocumento(boleto) {
		var beneficiario = boleto.getBeneficiario();

		return [
			this.getNossoNumeroFormatado(beneficiario)
		].join('-');
	};

	getNome() {
		return 'Banco do Brasil S.A.';
	};

	getImprimirNome() {
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

	novoBancoBrasil() {
		return new BancoBrasil();
	};
}

module.exports = BancoBrasil;
