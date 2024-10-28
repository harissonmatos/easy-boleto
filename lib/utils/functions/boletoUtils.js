//Este submodulo de boletos é inspirado no Stella-Boletos, da Caelum
//https://github.com/caelum/caelum-stella
const formatacoes = require('./formatacoesUtils');
const validacoes = require('../functions/validacoesUtils');
const utils = require('../utils');
const moment = require('moment');
const pad = utils.pad;

const Gerador = require('../../boleto/gerador-de-boleto');
const GeradorDeLinhaDigitavel = require('../../boleto/gerador-de-linha-digitavel');

module.exports = {
	especiesDeDocumento: {
		'CC': 'Contrato de Câmbio',
		'CCB': 'Cédula de Crédito Bancário',
		'CBI': 'Cédula de Crédito Bancário por Indicação',
		'CD': 'Confissão de Dívida Apenas Para Falência de Declaração do Devedor',
		'CH': 'Cheque',
		'CM': 'Contrato de Mútuo',
		'CPS': 'Conta de Prestação de Serviços de Profissional Liberal ou Declaração do Profissional',
		'CT': 'Espécie de Contrato',
		'DD': 'Documento de Dívida',
		'DMI': 'Duplicata de Venda Mercantil por Indicação',
		'DM': 'Duplicata de Venda Mercantil',
		'DS': 'Duplicata de Prestação de Serviços Original',
		'DSI': 'Duplicata de Prestação de Serviços por Indicação de Comprovante',
		'EC': 'Encargos Condominiais',
		'FS': 'Fatura de Serviço',
		'LC': 'Letra de Câmbio',
		'ME': 'Mensalidade Escolar',
		'NP': 'Nota Promissória',
		'RA': 'Recibo de Aluguel Para Pessoa Jurídica (Contrato Aluguel e Recibo)',
		'TA': 'Termo de Acordo - Ex. Ação Trabalhista',
		'DV': 'Diversos',
	},
	Gerador: Gerador
};

class Pagador {

	getNome() {
		return this._nome;
	};

	comNome(_nome) {
		this._nome = _nome;
		return this;
	};

	getIdentificacao() {
		var identificacao = this.getNome(),
			tipo = this.temRegistroNacional();

		if (tipo) {
			identificacao += [
				' (',
				tipo.toUpperCase(),
				': ',
				this.getRegistroNacionalFormatado(),
				')'
			].join('') || '';
		}

		return (identificacao || '').toUpperCase();
	};

	getRegistroNacional() {
		return this._registroNacional;
	};

	getRegistroNacionalFormatado() {
		return formatacoes.registroNacional(this._registroNacional);
	};

	temRegistroNacional() {
		return validacoes.eRegistroNacional(this._registroNacional);
	};

	comCNPJ(_cnpj) {
		this.comRegistroNacional(_cnpj);
		return this;
	};

	comCPF(_cpf) {
		this.comRegistroNacional(_cpf);
		return this;
	};

	comRegistroNacional(_registroNacional) {
		this._registroNacional = _registroNacional;
		return this;
	};

	getDocumento() {
		return this._documento;
	};

	comDocumento(_documento) {
		this._documento = _documento;
		return this;
	};

	getEndereco() {
		return this._endereco;
	};

	comEndereco(_endereco) {
		this._endereco = _endereco;
		return this;
	};

	novoPagador() {
		return new Pagador().comEndereco(Endereco.novoEndereco());
	};
}

module.exports.Pagador = Pagador;

class Beneficiario {

	getIdentificacao() {
		var identificacao = this.getNome(),
			tipo = this.temRegistroNacional();

		if (tipo) {
			identificacao += [
				' (',
				tipo.toUpperCase(),
				': ',
				this.getRegistroNacionalFormatado(),
				')'
			].join('');
		}

		return (identificacao || '').toUpperCase();
	};

	getRegistroNacional() {
		return this._registroNacional;
	};

	getRegistroNacionalFormatado() {
		return formatacoes.registroNacional(this._registroNacional);
	};

	temRegistroNacional() {
		return validacoes.eRegistroNacional(this._registroNacional);
	};

	comCNPJ(_cnpj) {
		this.comRegistroNacional(_cnpj);
		return this;
	};

	comCPF(_cpf) {
		this.comRegistroNacional(_cpf);
		return this;
	};

	comRegistroNacional(_registroNacional) {
		this._registroNacional = _registroNacional;
		return this;
	};

	comAgencia(_agencia) {
		this._agencia = _agencia;
		return this;
	};

	getAgencia() {
		return this._agencia;
	};


	comCodPosto(_posto) {
		this._posto = _posto;
		return this;
	};

	getCodposto() {
		return this._posto;
	};

	getAgenciaFormatada() {
		return pad(this._agencia, 4, '0');
	};

	comDigitoAgencia(_digitoAgencia) {
		this._digitoAgencia = _digitoAgencia;
		return this;
	};

	getDigitoAgencia() {
		return this._digitoAgencia;
	};

	comCodigoBeneficiario(_codigo) {
		this._codigo = _codigo;
		return this;
	};

	getCodigoBeneficiario() {
		return this._codigo;
	};

	getDigitoCodigoBeneficiario() {
		return this._digitoCodigoBeneficiario;
	};

	comDigitoCodigoBeneficiario(_digitoCodigoBeneficiario) {
		this._digitoCodigoBeneficiario = _digitoCodigoBeneficiario;
		return this;
	};

	getCarteira() {
		return this._carteira;
	};

	comCarteira(_carteira) {
		this._carteira = _carteira;
		return this;
	};

	getNossoNumero() {
		return this._nossoNumero;
	};

	comNossoNumero(_nossoNumero) {
		this._nossoNumero = _nossoNumero;
		return this;
	};

	getDigitoNossoNumero() {
		return this._digitoNossoNumero;
	};

	comDigitoNossoNumero(_digitoNossoNumero) {
		this._digitoNossoNumero = _digitoNossoNumero;
		return this;
	};

	getNome() {
		return this._nome;
	};

	comNome(_nomeBeneficiario) {
		this._nome = _nomeBeneficiario;
		return this;
	};

	getEndereco() {
		return this._endereco;
	};

	comEndereco(_endereco) {
		this._endereco = _endereco;
		return this;
	};

	getNumeroConvenio() {
		return this._numeroConvenio;
	};

	comNumeroConvenio(_numeroConvenio) {
		this._numeroConvenio = _numeroConvenio;
		return this;
	};

	getDocumento() {
		return this._documento;
	};

	comDocumento(_documento) {
		this._documento = _documento;
		return this;
	};

	novoBeneficiario() {
		return new Beneficiario();
	};
}

module.exports.Beneficiario = Beneficiario;

function removerHoras(data) {
	data.setHours(0);
	data.setMinutes(0);
	data.setSeconds(0);
	data.setMilliseconds(0);

	return data;
}

function formatar(data) {
	return [
		pad(data.getDate(), 2, '0'),
		pad(data.getMonth() + 1, 2, '0'),
		data.getFullYear()
	].join('/');
}

class Datas {
	comDocumento(_documento, locate = 'usa') {
		const [day, month, year] = _documento.split('-');
		_documento = `${month}-${day}-${year}`;
		if (locate === 'usa') {
			_documento = new Date(_documento);
		} else if (locate === 'brl') {
			_documento = new Date(moment(new Date(_documento)).format('YYYY-MM-DD'));
		}

		this._documento = removerHoras(_documento);
		return this;
	}

	getDocumento() {
		return this._documento;
	}

	getDocumentoFormatado() {
		return formatar(this.getDocumento());
	}

	comProcessamento(_processamento, locate = 'usa') {
		const [day, month, year] = _processamento.split('-');
		_processamento = `${month}-${day}-${year}`;
		if (locate === 'usa') {
			_processamento = new Date(_processamento);
		} else if (locate === 'brl') {
			_processamento = new Date(moment(new Date(_processamento)).format('YYYY-MM-DD'));
		}

		this._processamento = removerHoras(_processamento);
		return this;
	}

	getProcessamento() {
		return this._processamento;
	}

	getProcessamentoFormatado() {
		return formatar(this.getProcessamento());
	}

	comVencimento(_vencimento, locate = 'usa') {
		const [day, month, year] = _vencimento.split('-');;
		_vencimento = `${month}-${day}-${year}`;
		if (locate == 'usa') {
			_vencimento = new Date(_vencimento);
		} else if (locate == 'brl') {
			_vencimento = new Date(moment(new Date(_vencimento)).format('YYYY-MM-DD'));
		}

		this._vencimento = removerHoras(_vencimento);
		return this;
	}

	getVencimento() {
		return this._vencimento;
	}

	getVencimentoFormatado() {
		return formatar(this._vencimento);
	}

	static novasDatas() {
		return new Datas();
	}
}

module.exports.Datas = Datas;

class Endereco {
	getLogradouro() {
		return this._logradouro || '';
	}

	comLogradouro(_logradouro) {
		this._logradouro = _logradouro;
		return this;
	}

	getBairro() {
		return this._bairro || '';
	}

	comBairro(_bairro) {
		this._bairro = _bairro;
		return this;
	}

	getCep() {
		return this._cep || '';
	}

	getCepFormatado() {
		return formatacoes.cep(this.getCep());
	}

	comCep(_cep) {
		this._cep = _cep;
		return this;
	}

	getCidade() {
		return this._cidade || '';
	}

	comCidade(_cidade) {
		this._cidade = _cidade;
		return this;
	}

	getUf() {
		return this._uf || '';
	}

	comUf(_uf) {
		this._uf = _uf;
		return this;
	}

	getPrimeiraLinha() {
		let resultado = '';

		if (this.getLogradouro()) {
			resultado += this.getLogradouro();
		}

		if (this.getLogradouro() && this.getBairro()) {
			resultado += ', ';
		}

		if (this.getBairro()) {
			resultado += this.getBairro();
		}

		return resultado;
	}

	getSegundaLinha() {
		let resultado = '';

		if (this.getCidade()) {
			resultado += this.getCidade();
		}

		if (this.getCidade() && this.getUf()) {
			resultado += '/';
		}

		if (this.getUf()) {
			resultado += this.getUf();
		}

		if (resultado && this.getCep()) {
			resultado += ' — ';
		}

		if (this.getCep()) {
			resultado += this.getCepFormatado();
		}

		return resultado;
	}

	getEnderecoCompleto() {
		const enderecoCompleto = [];

		this.getLogradouro() && enderecoCompleto.push(this.getLogradouro());
		this.getBairro() && enderecoCompleto.push(this.getBairro());
		this.getCep() && enderecoCompleto.push(this.getCepFormatado());
		this.getCidade() && enderecoCompleto.push(this.getCidade());
		this.getUf() && enderecoCompleto.push(this.getUf());

		return enderecoCompleto.join(' ');
	}

	static novoEndereco() {
		return new Endereco();
	}
}

module.exports.Endereco = Endereco;

function formatarValor(valor) {
	var valorArray = valor.toString().split('.'),
		inteiros = valorArray[0],
		decimais = valorArray.length > 1 ? valorArray[1] : '00';

	decimais = pad(decimais, 2, '0', 'right').substr(0, 2);

	return pad(inteiros + decimais, 10, '0');
}

function formatarBRL(valor) {
	var zeroAEsquerda = true,
		i = -1;

	return 'R$ ' + (valor.substr(0, 8).split('').reduce(function (acc, cur) {
		if (cur === '0' && zeroAEsquerda) {
			return acc;
		}

		zeroAEsquerda = false;
		return acc + cur;
	}, '').split('').reduceRight(function (acc, cur) {
		i++;
		return cur + (i !== 0 && i % 3 === 0 ? '.' : '') + acc;
	}, '') || 0) + ',' + valor.substr(8, 2);
}

class Boleto {
	static DATA_BASE = new Date(1997, 10 - 1, 7);

	getFatorVencimento() {
		var vencimento = this.getDatas().getVencimento(),
			diferencaEmDias = (vencimento - Boleto.DATA_BASE) / (1000 * 60 * 60 * 24);

		return Math.floor(diferencaEmDias).toString();
	};

	comEspecieMoeda(_especieMoeda) {
		this._especieMoeda = _especieMoeda;
		return this;
	};

	getEspecieMoeda() {
		return this._especieMoeda;
	};

	getCodigoEspecieMoeda() {
		return this._codigoEspecieMoeda;
	};

	comCodigoEspecieMoeda(_codigoEspecieMoeda) {
		this._codigoEspecieMoeda = _codigoEspecieMoeda.toString();
		return this;
	};

	getAceite() {
		return this._aceite;
	};

	getAceiteFormatado() {
		return this._aceite ? 'S' : 'N';
	};

	comAceite(_aceite) {
		this._aceite = _aceite;
		return this;
	};

	getEspecieDocumento() {
		return this._especieDocumento;
	};

	comEspecieDocumento(_especieDocumento) {
		this._especieDocumento = _especieDocumento;
		return this;
	};

	getDatas() {
		return this._datas;
	};

	comDatas(_datas) {
		this._datas = _datas;
		return this;
	};

	getValorFormatado() {
		return formatarValor(this._valorBoleto);
	};

	getValorFormatadoBRL() {
		return formatarBRL(this.getValorFormatado());
	};

	getValorBoleto() {
		return this._valorBoleto;
	};

	comValorBoleto(_valorBoleto) {
		if (_valorBoleto < 0) {
			throw new Error('Valor deve ser maior ou igual a zero');
		}

		this._valorBoleto = _valorBoleto;
		return this;
	};

	comValor(_valorBoleto) {
		this.comValorBoleto(_valorBoleto);
	};

	getNumeroDoDocumentoFormatado() {
		return pad(this._numeroDoDocumento || '', 4, '0');
	};

	getNumeroDoDocumento() {
		return this._numeroDoDocumento || '';
	};

	comNumeroDoDocumento(_numeroDoDocumento) {
		this._numeroDoDocumento = _numeroDoDocumento;
		return this;
	};

	getInstrucoes() {
		return this._instrucoes || [];
	};

	comInstrucoes(_instrucoes) {
		if (arguments.length > 1) {
			_instrucoes = Array.prototype.slice.call(arguments, 0);
		}

		if (typeof _instrucoes === 'string') {
			_instrucoes = [_instrucoes];
		}

		this._instrucoes = _instrucoes;
		return this;
	};

	getDescricoes() {
		return this._descricoes || [];
	};

	comDescricoes(_descricoes) {
		if (arguments.length > 1) {
			_descricoes = Array.prototype.slice.call(arguments, 0);
		}

		if (typeof _descricoes === 'string') {
			_descricoes = [_descricoes];
		}

		this._descricoes = _descricoes;
		return this;
	};

	getLocaisDePagamento() {
		if (this._locaisDePagamento) return this._locaisDePagamento;
		if (this.getBanco().bankConfigs.locaisDePagamentoPadrao) return this.getBanco().bankConfigs.locaisDePagamentoPadrao;
		return [];
	};

	comLocaisDePagamento(_locaisDePagamento) {
		if (arguments.length > 1) {
			_locaisDePagamento = Array.prototype.slice.call(arguments, 0);
		}

		if (typeof _locaisDePagamento === 'string') {
			_locaisDePagamento = [_locaisDePagamento];
		}

		this._locaisDePagamento = _locaisDePagamento;
		return this;
	};

	getQuantidadeDeMoeda() {
		return this._quantidadeDeMoeda;
	};

	comQuantidadeDeMoeda(_quantidadeDeMoeda) {
		this._quantidadeDeMoeda = _quantidadeDeMoeda;
		return this;
	};

	getBanco() {
		return this._banco;
	};

	comBanco(_banco) {
		this._banco = _banco;
		return this;
	};

	getPagador() {
		return this._pagador;
	};

	comPagador(_pagador) {
		this._pagador = _pagador;
		return this;
	};

	getBeneficiario() {
		return this._beneficiario;
	};

	comBeneficiario(_beneficiario) {
		this._beneficiario = _beneficiario;
		return this;
	};

	getValorDescontosFormatadoBRL() {
		if (!this.getValorDescontos()) {
			return '';
		}

		return formatarBRL(formatarValor(this.getValorDescontos()));
	};

	getValorDescontos() {
		return this._valorDescontos || 0;
	};

	comValorDescontos(_valorDescontos) {
		this._valorDescontos = _valorDescontos;
		return this;
	};

	getValorDeducoesFormatadoBRL() {
		if (!this.getValorDeducoes()) {
			return '';
		}

		return formatarBRL(formatarValor(this.getValorDeducoes()));
	};

	getValorDeducoes() {
		return this._valorDeducoes || 0;
	};

	comValorDeducoes(_valorDeducoes) {
		this._valorDeducoes = _valorDeducoes;
		return this;
	};

	getValorMultaFormatadoBRL() {
		return formatarBRL(formatarValor(this.getValorMulta()));
	};

	getValorMulta() {
		return this._valorMulta || 0;
	};

	comValorMulta(_valorMulta) {
		this._valorMulta = _valorMulta;
		return this;
	};

	getValorAcrescimosFormatadoBRL() {
		return formatarBRL(formatarValor(this.getValorAcrescimos()));
	};

	getValorAcrescimos() {
		return this._valorAcrescimos || 0;
	};

	comValorAcrescimos(_valorAcrescimos) {
		this._valorAcrescimos = _valorAcrescimos;
		return this;
	};

	getLinhaDigitavelFormatado() {
		const numeroDocumento = this.getNumeroDoDocumentoFormatado();
		const linha = GeradorDeLinhaDigitavel(this._banco.geraCodigoDeBarrasPara(this), this._banco);
		const linhaDigitavel = { linha, numeroDocumento };
		return linhaDigitavel;
	};

	comCodigoBarras(_codigoBarras) {
		this._codigoBarras = _codigoBarras;
		return this;
	}

	comLinhaDigitavel(_linhaDigitavel) {
		this._linhaDigitavel = _linhaDigitavel;
		return this;
	}

	comQrCode(_qrCode) {
		this._qrCode = _qrCode;
		return this;
	}

	novoBoleto() {
		return new Boleto()
			.comEspecieMoeda('R$')
			.comCodigoEspecieMoeda(9)
			.comAceite(false)
			.comEspecieDocumento('DV');
	};
}

module.exports.Boleto = Boleto;
