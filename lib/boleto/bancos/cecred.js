// DELETE ME
const path = require('path');
const utils = require('../../utils/utils');
const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

const NUMERO_CECRED = '085';
const DIGITO_CECRED = '1';

class Cecred {

	getTitulos() {//OK
		return {
			instrucoes: 'Instruções (texto de responsabilidade do beneficiaário)',
			nomeDoPagador: 'Pagador',
			especie: 'Moeda',
			quantidade: 'Quantidade',
			valor: 'x Valor',
			moraMulta: '(+) Moras / Multa'
		};
	};

	exibirReciboDoPagadorCompleto() {//OK
		return true;
	};

	exibirCampoCip() {//OK
		return true;
	};

	geraCodigoDeBarrasPara(boleto) {//OK
		const beneficiario = boleto.getBeneficiario();
		const errorMsg = 'Erro ao gerar código de barras,';

		if (!beneficiario.getNumeroConvenio() || beneficiario.getNumeroConvenio().length != 6)
			throw new Error(`${errorMsg} número convênio da cooperativa não possui 6 dígitos: ${beneficiario.getNumeroConvenio()}`);
		if (!beneficiario.getNossoNumero() || beneficiario.getNossoNumero().length != 17)
			throw new Error(`${errorMsg} nosso número não possui 17 dígitos: ${beneficiario.getNossoNumero()}`);
		if (!beneficiario.getCarteira() || beneficiario.getCarteira().length != 2)
			throw new Error(`${errorMsg} código carteira não possui 2 dígitos: ${beneficiario.getCarteira()}`);

		const campoLivre = [];
		campoLivre.push(beneficiario.getNumeroConvenio());
		campoLivre.push(beneficiario.getNossoNumero());
		campoLivre.push(beneficiario.getCarteira().substring(0, 2));
		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	getNumeroFormatadoComDigito() {//OK
		return [NUMERO_CECRED, DIGITO_CECRED].join('-');
	};

	getNumeroFormatado() {//OK
		return NUMERO_CECRED;
	};

	getCarteiraFormatado(beneficiario) {//OK
		return utils.pad(beneficiario.getCarteira(), 2, '0');
	};

	getCarteiraTexto(beneficiario) {//OK
		return utils.pad(beneficiario.getCarteira(), 2, '0');
	};

	getCodigoFormatado(beneficiario) {//OK
		return utils.pad(beneficiario.getCodigoBeneficiario(), 7, '0');
	};

	getImagem = function () {//OK
		return path.join(__dirname, 'logotipos/ailos.png');
	};

	getNossoNumeroFormatado = function (beneficiario) {//OK
		return utils.pad(beneficiario.getNossoNumero(), 11, '0');
	};

	getNossoNumeroECodigoDocumento = function (boleto) {//OK
		const beneficiario = boleto.getBeneficiario();

		let nossoNumero = this.getNossoNumeroFormatado(beneficiario);
		if (beneficiario.getDigitoNossoNumero()) nossoNumero += `-${beneficiario.getDigitoNossoNumero()}`;
		console.log(nossoNumero)
		return nossoNumero;
	};

	getNome = function () {//OK
		return 'Ailos';
	};

	getImprimirNome = function () {//OK
		return false;
	};

	getLocaisDePagamentoPadrao = function () {//OK
		return ['PAGAVEL PREFERENCIALMENTE NAS COOPERATIVAS DO SISTEMA AILOS.', 'APOS VENCIMENTO PAGAR SOMENTE NA COOPERATIVA '];
	};

	getAgenciaECodigoBeneficiario = function (boleto) {
		const beneficiario = boleto.getBeneficiario();
		const digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();
		let codigo = this.getCodigoFormatado(beneficiario);

		if (digitoCodigo) codigo += '-' + digitoCodigo;

		const agenciaComDigito = beneficiario.getAgenciaFormatada() + '-' + beneficiario.getDigitoAgencia();

		return agenciaComDigito + '/' + codigo;
	};

	novoCecred = function () {
		return new Cecred();
	};

}

module.exports = Cecred;
