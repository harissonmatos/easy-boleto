const utils = require('../utils/utils');
const series = utils.series;
const mod = utils.mod;

function mod10(campo) {
	var digito = mod({
		value: campo,
		factors: [2, 1],
		divider: 10,
		direction: 'rightToLeft',
		cumplimentaryToDivider: true,
		reduceSummationTerms: true
	});

	return digito === 10 ? 0 : digito;
}

function mod11(codigoDeBarras, substituicoes) {
	if (!substituicoes) {
		substituicoes = {
			de: [0, 1, 10, 11],
			para: 1
		};
	}

	if (!Array.isArray(substituicoes.de)) {
		substituicoes.de = [substituicoes.de];
	}

	var digito = mod({
		value: codigoDeBarras,
		factors: series(2, 9),
		cumplimentaryToDivider: true,
	});

	if (substituicoes.de.indexOf(digito) !== -1) {
		digito = substituicoes.para;
	}

	return digito;
}

module.exports = {
	mod10,
	mod11
};
