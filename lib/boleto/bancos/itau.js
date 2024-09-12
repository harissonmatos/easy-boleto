// DELETE ME
const path = require('path');
const utils = require('../../utils/utils');
const pad = utils.pad;
const insert = utils.insert;


const GeradorDeDigitoPadrao = require('../gerador-de-digito-padrao');
const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');


//Varias coisas implementadas inclusive arquivos de retorno
//https://github.com/kivanio/brcobranca
//https://github.com/pagarme/node-boleto

//Várias validações
//http://ghiorzi.org/DVnew.htm

var Itau = (function () {
	var NUMERO_ITAU = '341',//ok
		DIGITO_ITAU = '7';//ok

	function Itau() {

	}

	Itau.prototype.getTitulos = function () {//ok
		return {};
	};

	Itau.prototype.exibirReciboDoPagadorCompleto = function () {//ok
		return false;
	};

	Itau.prototype.exibirCampoCip = function () {//ok
		return false;
	};

	Itau.prototype.geraCodigoDeBarrasPara = function (boleto) {//ok
		var beneficiario = boleto.getBeneficiario(),
			campoLivre = [];

		campoLivre.push(this.getCarteiraFormatado(beneficiario));
		campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
		campoLivre.push(beneficiario.getAgenciaFormatada());
		campoLivre.push(this.getCodigoFormatado(beneficiario));
		campoLivre.push('000');

		campoLivre = campoLivre.join('');

		var digito1 = GeradorDeDigitoPadrao.mod10(campoLivre.substring(11, 20));
		campoLivre = insert(campoLivre, 20, digito1);

		var digito2 = GeradorDeDigitoPadrao.mod10(campoLivre.substring(11, 20) + campoLivre.substring(0, 11));
		campoLivre = insert(campoLivre, 11, digito2);

		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	Itau.prototype.getNumeroFormatadoComDigito = function () {//ok
		return [NUMERO_ITAU, DIGITO_ITAU].join('-');
	};

	Itau.prototype.getCarteiraFormatado = function (beneficiario) {//ok
		return pad(beneficiario.getCarteira(), 3, '0');
	};

	Itau.prototype.getCarteiraTexto = function (beneficiario) {//ok
		return this.getCarteiraFormatado(beneficiario);
	};

	Itau.prototype.getCodigoFormatado = function (beneficiario) {//ok
		return pad(beneficiario.getCodigoBeneficiario(), 5, '0');
	};

	Itau.prototype.getImagem = function () {//ok
		return path.join(__dirname, 'logotipos/itau.png');
	};

	Itau.prototype.getNossoNumeroFormatado = function (beneficiario) {//ok
		return pad(beneficiario.getNossoNumero(), 8, '0');
	};

	Itau.prototype.getNossoNumeroECodigoDocumento = function (boleto) {//ok
		var beneficiario = boleto.getBeneficiario();

		return [
			beneficiario.getCarteira(),
			this.getNossoNumeroFormatado(beneficiario),
		].join('/') + '-' + beneficiario.getDigitoNossoNumero();
	};

	Itau.prototype.getNumeroFormatado = function () {//ok
		return NUMERO_ITAU;
	};

	Itau.prototype.getNome = function () {//OK
		return 'Banco Itaú S/A';
	};

	Itau.prototype.getImprimirNome = function () {//ok
		return true;
	};

	Itau.prototype.getAgenciaECodigoBeneficiario = function (boleto) {//ok
		var beneficiario = boleto.getBeneficiario(),

			codigo = this.getCodigoFormatado(beneficiario),
			digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

		if (digitoCodigo) {
			codigo += '-' + digitoCodigo;
		}

		return beneficiario.getAgenciaFormatada() + '/' + codigo;
	};

	Itau.novoItau = function () {
		return new Itau();
	};

	return Itau;
})();

module.exports = Itau;
