import PropTypes from 'prop-types';

export const TRAVEL = Object.freeze({

    idViagem: PropTypes.number,
    idEmpregado: PropTypes.number,
    idMunicipioSaida: PropTypes.number,
    DataInicioViagem: PropTypes.instanceOf(Date),
    DataInicioViagem: PropTypes.instanceOf(Date),
    destinos: [
        // {
        //     idMunicipioDestino: PropTypes.number,
        //     DataDestinoViagem: PropTypes.instanceOf(Date),
        //     custos: [
        //         {
        //             idTipoCusto: PropTypes.number,
        //             ValorCustoDestino: PropTypes.number
        //         }
        //     ]
        // }
    ]

});