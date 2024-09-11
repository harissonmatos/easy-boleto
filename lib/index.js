
const Boleto = require('./utils/functions/boletoUtils');
const formatacoes = require('./utils/functions/formatacoesUtils');
const validacoes = require('./utils/functions/validacoesUtils');
const utils = require('../lib/utils/utils');
const Boletos = require('./metodosPublicos/boletoMetodos');

module.exports = {
  Boletos,
  Bancos: Boleto.bancos,
  formatacoes,
  Validacoes: validacoes,
  StreamToPromise: utils.handleStream,
};
