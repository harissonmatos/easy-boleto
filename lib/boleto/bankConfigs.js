const path = require('path');
const bankConfigs = require('./bankConfigs.json');
const utils = require('../utils/utils');
const pad = utils.pad;

class BankConfigs {
    constructor(bankName) {
        this.bankName = bankName;
        this.bankConfigs = bankConfigs[bankName];
    }

    getNumeroFormatadoComDigito() {
        return [
            this.bankConfigs.numero,
            this.bankConfigs.digito
        ].join('-');
    };

    getImagem() {
        return path.join(__dirname, this.bankConfigs.imagem)
    }

    getCarteiraTexto(beneficiario) {
        if (this.bankName === 'Caixa') {
            return {
                1: 'RG',
                14: 'RG',
                2: 'SR',
                24: 'SR'
            }[beneficiario.getCarteira()];
        }
        return pad(beneficiario.getCarteira(), this.bankConfigs.carteiraPad, '0');
    }

    getCarteiraFormatado(beneficiario) {
        return pad(beneficiario.getCarteira(), this.bankConfigs.carteiraPad, '0');
    }

    getCodigoFormatado(beneficiario) {
        return pad(beneficiario.getCodigoBeneficiario(), this.bankConfigs.codigoFormatadoPad, '0');
    };

    getAgenciaECodigoBeneficiario(boleto) {
        switch (this.bankName) {
            case 'Banco do Brasil':
            case 'Bradesco':
            case 'Caixa':
            case 'Itau':
            case 'Santander':
            case 'Sicoob':
                var beneficiario = boleto.getBeneficiario();
                var codigo = this.getCodigoFormatado(beneficiario);
                var digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

                if (digitoCodigo) {
                    codigo += '-' + digitoCodigo;
                }
                return beneficiario.getAgenciaFormatada() + '/' + codigo;

            case 'Cecred':
                var beneficiario = boleto.getBeneficiario();
                var digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();
                var codigo = this.getCodigoFormatado(beneficiario);

                if (digitoCodigo) codigo += '-' + digitoCodigo;

                var agenciaComDigito = beneficiario.getAgenciaFormatada() + '-' + beneficiario.getDigitoAgencia();

                return agenciaComDigito + '/' + codigo;
            case 'Sicredi':
                var beneficiario = boleto.getBeneficiario(),

                    codigo = beneficiario.getCodposto() + '.' + beneficiario.getCodigoBeneficiario(),
                    digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

                if (digitoCodigo) {
                    codigo += '-' + digitoCodigo;
                }

                return beneficiario.getAgenciaFormatada() + '.' + codigo;
        }

    };
}

module.exports = BankConfigs;
