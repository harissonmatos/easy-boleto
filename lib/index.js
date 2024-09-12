const formatacoes = require('./utils/functions/formatacoesUtils');
const validacoes = require('./utils/functions/validacoesUtils');
const utils = require('../lib/utils/utils');
const Boletos = require('./metodosPublicos/boletoMetodos');
const BankConfigs = require('./boleto/bankConfigs');

module.exports = {
  Boletos,
  BankConfigs,
  formatacoes,
  Validacoes: validacoes,
  StreamToPromise: utils.handleStream,
};
