// DELETE ME
const path = require('path');
const utils = require('../../utils/utils');
const pad = utils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

const NUMERO_BRADESCO = '237';
const DIGITO_BRADESCO = '2';

class Bradesco {
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
		return true;
	};

	geraCodigoDeBarrasPara(boleto) {//OK
		var beneficiario = boleto.getBeneficiario(),
			campoLivre = [];

		campoLivre.push(beneficiario.getAgenciaFormatada());
		campoLivre.push(this.getCarteiraFormatado(beneficiario));
		campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
		campoLivre.push(this.getCodigoFormatado(beneficiario));
		campoLivre.push('0');

		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	getNumeroFormatadoComDigito() {//OK
		return [
			NUMERO_BRADESCO,
			DIGITO_BRADESCO
		].join('-');
	};

	getNumeroFormatado() {//IGNORADO
		return NUMERO_BRADESCO;
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

	getImagem() {//OK
		return path.join(__dirname, 'logotipos/bradesco.png');
	};

	getNossoNumeroFormatado(beneficiario) {
		return pad(beneficiario.getNossoNumero(), 11, '0');
	};

	getNossoNumeroECodigoDocumento(boleto) {
		var beneficiario = boleto.getBeneficiario();

		return this.getCarteiraFormatado(beneficiario) + '/' + [
			this.getNossoNumeroFormatado(beneficiario),
			beneficiario.getDigitoNossoNumero()
		].join('-');
	};

	getNome() {//OK
		return 'Banco Bradesco S.A.';
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

	novoBradesco() {//OK
		return new Bradesco();
	};
}

module.exports = Bradesco;
