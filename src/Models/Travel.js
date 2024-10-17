import PropTypes from 'prop-types';

export const TRAVEL = Object.freeze({

    idViagem: PropTypes.number,
    idEmpregado: PropTypes.number,
    unidadeFederativaId: PropTypes.number,
    idMunicipioSaida: PropTypes.number,
    idStatusViagem: PropTypes.number,

    DataInicioViagem: PropTypes.instanceOf(Date),
    DataTerminoViagem: PropTypes.instanceOf(Date),

    NomeStatusViagem: PropTypes.string,
    NomeMunicipioSaida: PropTypes.string,
    NomeUnidadeFederativaSaida: PropTypes.string,


    usuario: {
        idEmpregado: PropTypes.number,
        nomeEmpregado: PropTypes.string,
    },

    destinos: [
        {
            idViagem: PropTypes.number,
            idUnidadeFederativa: PropTypes.number,
            idMunicipioDestino: PropTypes.number,
            DataDestinoViagem: PropTypes.instanceOf(Date),

            municipio: {
                idMunicipio: PropTypes.number,
                NomeMunicipio: PropTypes.string
            },

            unidadeFederativa: {
                idUnidadeFederativa: PropTypes.number,
                NomeUnidadeFederativa: PropTypes.string
            },

            custos: [
                {
                    idTipoCusto: PropTypes.number,
                    NomeTipoCusto: PropTypes.string,
                    ValorCustoDestino: "R$ 150,50"
                }
            ]
        }
    ]
});
