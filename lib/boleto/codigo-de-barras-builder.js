const GeradorDeDigitoPadrao = require('./gerador-de-digito-padrao');
const utils = require('../utils/utils');
const insert = utils.insert;

class CodigoDeBarrasBuilder {
	constructor(boleto) {
		const codigoDeBarras = [];
		const banco = boleto.getBanco();

		codigoDeBarras.push(banco.bankConfigs.numeroFormatado);
		codigoDeBarras.push(boleto.getCodigoEspecieMoeda());
		codigoDeBarras.push(boleto.getFatorVencimento());
		codigoDeBarras.push(boleto.getValorFormatado());

		this._banco = banco;
		this._codigoDeBarras = codigoDeBarras.join('');
	}
	comCampoLivre(campoLivre) {
		let codigoDeBarras = this._codigoDeBarras;

		if (Array.isArray(campoLivre)) campoLivre = campoLivre.join('');

		if (!campoLivre.length) throw new Error('Campo livre está vazio');

		codigoDeBarras += campoLivre;

		let digito = GeradorDeDigitoPadrao.mod11(codigoDeBarras);
		codigoDeBarras = insert(codigoDeBarras, 4, digito);

		return codigoDeBarras;
	}
}

module.exports = CodigoDeBarrasBuilder;
