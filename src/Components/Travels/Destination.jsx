import { IconPlaneArrival, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { GetFederativeUnits } from "../../Services/FederativeUnits";
import { GetCities } from "../../Services/Cities";

export default function TravelDestination({ index, idMunicipioDestino, DataDestinoViagem, custo, updateDestination, updateCost, removeDestination }) {

    const [federativeUnits, setFederativeUnits] = useState([]);
    const [cities, setCities] = useState([]);

    const [federativeUnitID, setFederativeUnitID] = useState(null);

    const [importingFederativeUnits, setImportingFederativeUnits] = useState(false);
    const [importingCities, setImportingCities] = useState(false);

    useEffect(() => { getFederativeUnits() }, []);

    useEffect(() => { if (federativeUnitID) { getCities() } }, [federativeUnitID]);

    async function getFederativeUnits() {
        setImportingFederativeUnits(true);
        try {
            const result = await GetFederativeUnits();
            setFederativeUnits(result);
        }
        catch (error) {

        }
        setImportingFederativeUnits(false);
    }

    async function getCities() {
        setImportingCities(true);
        try {
            const result = await GetCities(federativeUnitID);
            setCities(result);
        }
        catch (error) {

        }
        setImportingCities(false);
    }

    return (
        <div className="card border-success">
            <div className="card-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h6 className="card-title text-uppercase mb-0">
                            <IconPlaneArrival className="me-2" size={36} stroke={1} />
                            Destino {index + 1}
                        </h6>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-sm float-end px-2" onClick={() => removeDestination(index)}>
                            <IconTrash className="icon" stroke={1} />
                            Remover Destino
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row mb-3">

                    <div className="col-12 col-lg mb-3 mb-lg-0">
                        <label className="form-label required" htmlFor={`uf_${index}`}>Unidade Federativa:</label>
                        <select
                            className="form-select"
                            disabled={importingFederativeUnits}
                            value={federativeUnitID}
                            onChange={(e) => {

                                setFederativeUnitID(e.target.value)
                                updateDestination(index, 'idMunicipioDestino', null)

                            }}
                        >
                            {importingFederativeUnits == false && federativeUnitID == null && <option selected disabled label="Selecionar Unidade Federativa..." />}
                            {importingFederativeUnits && <option selected disabled label="Carregando..." />}
                            {federativeUnits.map(federativeUnit =>
                                <option
                                    key={federativeUnit.idUnidadeFederativa}
                                    value={federativeUnit.idUnidadeFederativa}
                                    label={federativeUnit.NomeUnidadeFederativa}
                                />
                            )}
                        </select>
                    </div>

                    <div className="col-12 col-lg">
                        <label className="form-label required" htmlFor={`cidade_${index}`}>Cidade:</label>
                        <select
                            id={`cidade_${index}`}
                            className="form-select"
                            disabled={federativeUnitID == null || importingCities}
                            value={idMunicipioDestino}
                            onChange={(e) => updateDestination(index, 'idMunicipioDestino', e.target.value)}
                        >
                            {importingCities == false && idMunicipioDestino == null && <option selected disabled label="Selecionar Cidade..." />}
                            {importingCities && <option selected disabled label="Carregando..." />}
                            {cities.map(city =>
                                <option
                                    key={city.idMunicipio}
                                    value={city.idMunicipio}
                                    label={city.NomeMunicipio}
                                />
                            )}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label required" htmlFor={`data_${index}`}>Data:</label>
                        <input
                            type="date"
                            id={`data_${index}`}
                            className="form-control"
                            value={DataDestinoViagem}
                            onChange={(e) => updateDestination(index, 'DataDestinoViagem', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mb-2">
                        <h6 className="text-uppercase">Custos</h6>
                    </div>
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Passagem</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="R$ 0,00"
                                            value={custo?.ValorCustoDestino || ''}
                                            onChange={(e) => updateCost(index, e.target.value)}
                                        />
                                    </td>
                                </tr>
                                {/* Outros campos de custos */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}