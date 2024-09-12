// DELETE ME
const path = require('path');
const utils = require('../../utils/utils');
const pad = utils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

const NUMERO_BANCO_BRASIL = '001';
const DIGITO_BANCO_BRASIL = '9';

class BancoBrasil {

	getTitulos() {//OK
		return {
			instrucoes: 'Informações de responsabilidade do beneficiário',
			nomeDoPagador: 'Nome do Pagador',
			especie: 'Moeda',
			quantidade: 'Quantidade',
			valor: 'Valor',
			moraMulta: '(+) Juros / Multa'
		};
	};

	exibirReciboDoPagadorCompleto() {//OK
		return true;
	};

	exibirCampoCip() {//OK
		return false;
	};

	geraCodigoDeBarrasPara(boleto) {//OK
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

	getNumeroFormatadoComDigito() {//OK
		return [
			NUMERO_BANCO_BRASIL,
			DIGITO_BANCO_BRASIL
		].join('-');
	};

	getNumeroFormatado() {//OK
		console.log('getNumeroFormatado:', NUMERO_BANCO_BRASIL);
		return NUMERO_BANCO_BRASIL;
	};

	getCarteiraFormatado(beneficiario) {//OK
		console.log('getCarteiraFormatado:', pad(beneficiario.getCarteira(), 2, '0'));
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	getCarteiraTexto(beneficiario) {//OK
		console.log('getCarteiraTexto:', pad(beneficiario.getCarteira(), 2, '0'));
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	getCodigoFormatado(beneficiario) {//OK
		console.log('getCodigoFormatado:', pad(beneficiario.getCodigoBeneficiario(), 7, '0'));
		return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
	};

	getImagem() {//OK
		console.log('getImagem:', path.join(__dirname, 'logotipos/banco-do-brasil.png'));
		return path.join(__dirname, 'logotipos/banco-do-brasil.png');
	};

	getNossoNumeroFormatado(beneficiario) {//OK
		return pad(beneficiario.getNossoNumero(), 17, '0');
	};

	getNossoNumeroECodigoDocumento(boleto) {//OK
		var beneficiario = boleto.getBeneficiario();

		return [
			this.getNossoNumeroFormatado(beneficiario)
		].join('-');
	};

	getNome() {//OK
		return 'Banco do Brasil S.A.';
	};

	getImprimirNome() {//OK
		return false;
	};

	getAgenciaECodigoBeneficiario(boleto) {//OK
		var beneficiario = boleto.getBeneficiario(),

			codigo = this.getCodigoFormatado(beneficiario),
			digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

		if (digitoCodigo) {
			codigo += '-' + digitoCodigo;
		}

		return beneficiario.getAgenciaFormatada() + '/' + codigo;
	};

	novoBancoBrasil() {//OK
		return new BancoBrasil();
	};
}

module.exports = BancoBrasil;
