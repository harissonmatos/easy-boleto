const path = require('path');
const utils = require('../../utils/utils');
const pad = utils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');


var Sicoob = (function () {
	var NUMERO_SICOOB = '756',
		DIGITO_SICOOB = '0';

	function Sicoob() {

	}

	Sicoob.prototype.getTitulos = function () {//OK
		return {
			localDoPagamento: 'Local de Pagamento',
			especieDoDocumento: 'Espécie',
			instrucoes: 'Instruções (texto de responsabilidade do beneficiário)',
			agenciaECodigoDoBeneficiario: 'Coop. contratante/Cód. Beneficiário',
			valorDoDocumento: 'Valor Documento',
			igualDoValorDoDocumento: '',
			nomeDoPagador: 'Nome do Pagador'
		};
	};

	Sicoob.prototype.exibirReciboDoPagadorCompleto = function () {//ok
		return false;
	};

	Sicoob.prototype.exibirCampoCip = function () {//ok
		return false;
	};

	Sicoob.prototype.geraCodigoDeBarrasPara = function (boleto) {
		var beneficiario = boleto.getBeneficiario(),
			campoLivre = [];

		campoLivre.push(this.getCarteiraFormatado(beneficiario));
		campoLivre.push(beneficiario.getAgenciaFormatada());
		campoLivre.push(pad(beneficiario.getCarteira(), 2, '0'));
		campoLivre.push(this.getCodigoFormatado(beneficiario));
		campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
		campoLivre.push(beneficiario.getDigitoNossoNumero());
		campoLivre.push('001');

		campoLivre = campoLivre.join('');

		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	Sicoob.prototype.getNumeroFormatadoComDigito = function () {
		return [NUMERO_SICOOB, DIGITO_SICOOB].join('-');
	};

	Sicoob.prototype.getCarteiraFormatado = function (beneficiario) {//ok
		return pad(beneficiario.getCarteira(), 1, '0');
	};

	Sicoob.prototype.getCarteiraTexto = function (beneficiario) {//ok
		return this.getCarteiraFormatado(beneficiario);
	};

	Sicoob.prototype.getCodigoFormatado = function (beneficiario) {//ok
		return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
	};

	Sicoob.prototype.getImagem = function () {//ok
		return path.join(__dirname, 'logotipos/sicoob.png');
	};

	Sicoob.prototype.getNossoNumeroFormatado = function (beneficiario) {//ok
		return pad(beneficiario.getNossoNumero(), 7, '0');
	};

	Sicoob.prototype.getNossoNumeroECodigoDocumento = function (boleto) {
		var beneficiario = boleto.getBeneficiario();

		return pad(beneficiario.getCarteira(), 2, '0') + '/' + [
			this.getNossoNumeroFormatado(beneficiario),
			beneficiario.getDigitoNossoNumero()
		].join('-');
	};

	Sicoob.prototype.getNumeroFormatado = function () {//ok
		return NUMERO_SICOOB;
	};

	Sicoob.prototype.getNome = function () {//ok
		return '';
	};

	Sicoob.prototype.getImprimirNome = function () {//ok
		return true;
	};

	Sicoob.prototype.getAgenciaECodigoBeneficiario = function (boleto) {
		var beneficiario = boleto.getBeneficiario(),

			codigo = this.getCodigoFormatado(beneficiario),
			digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

		if (digitoCodigo) {
			codigo += '-' + digitoCodigo;
		}

		return beneficiario.getAgenciaFormatada() + '/' + codigo;
	};

	Sicoob.novoSicoob = function () {
		return new Sicoob();
	};

	return Sicoob;
})();

module.exports = Sicoob;
