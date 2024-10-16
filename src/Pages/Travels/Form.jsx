import { useNavigate, useParams } from "react-router-dom";
import { TRAVEL } from "../../Models/Travel";
import { GetTravel } from "../../Services/Travels";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../../Components/Header";
import { IconBuildingAirport, IconCheck, IconPlaneArrival, IconPlus, IconTrash } from "@tabler/icons-react";
import { GetFederativeUnits } from "../../Services/FederativeUnits";
import TravelDestination from "../../Components/Travels/Destination";
import { GetCities } from "../../Services/Cities";

export default function Travels_FormPage() {

    const { identifier } = useParams();
    const navigate = useNavigate();
    const lastDestinationRef = useRef(null); // Referência para o último destino

    const [travel, setTravel] = useState(TRAVEL);
    const [federativeUnitID, setFederativeUnitID] = useState(null);

    const [federativeUnits, setFederativeUnits] = useState([]);
    const [cities, setCities] = useState([]);

    const [importing, setImporting] = useState(false);
    const [importingFederativeUnits, setImportingFederativeUnits] = useState(false);
    const [importingCities, setImportingCities] = useState(false);


    const [processing, setProcessing] = useState(false);

    const [errorOnImport, setErrorOnImport] = useState(false);
    const [errorOnProcess, setErrorOnProcess] = useState(false);


    useEffect(() => { getTravel(); }, [identifier]);

    useEffect(() => { getFederativeUnits(); }, []);
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

    async function getTravel() {
        setImporting(true);
        try {
            const result = await GetTravel(identifier);
            setTravel(result);
        } catch (error) {
            setErrorOnImport(error?.response?.data?.message || error.message);
        }
        setImporting(false);
    }

    async function saveTravel() {
        // Lógica para salvar a viagem
    }

    function addDestination() {
        const destination = {
            "idMunicipioDestino": 101,
            "DataDestinoViagem": "2024-01-05",
            "custos": [
                {
                    "idTipoCusto": 1,
                    "ValorCustoDestino": 0
                },
                {
                    "idTipoCusto": 2,
                    "ValorCustoDestino": 0
                },
                {
                    "idTipoCusto": 3,
                    "ValorCustoDestino": 0
                },
                {
                    "idTipoCusto": 4,
                    "ValorCustoDestino": 0
                },
            ]
        };
        setTravel(_ => ({ ..._, destinos: [..._.destinos, destination] }));

        // Após adicionar, rola a tela até o último card
        setTimeout(() => {
            if (lastDestinationRef.current) {
                lastDestinationRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0); // O timeout garante que o DOM seja atualizado antes de tentar rolar.
    }

    function removeDestination(index) {
        setTravel(prevTravel => ({
            ...prevTravel,
            destinos: prevTravel.destinos.filter((_, i) => i !== index)
        }));
    }

    function updateDestination(index, field, value) {
        setTravel(prevTravel => ({
            ...prevTravel,
            destinos: prevTravel.destinos.map((destination, i) =>
                i === index
                    ? { ...destination, [field]: value }
                    : destination
            )
        }));
    }

    function updateCost(destinationIndex, idTipoCusto, newValue) {
        setTravel(prevTravel => ({
            ...prevTravel,
            destinos: prevTravel.destinos.map((destination, i) =>
                i === destinationIndex
                    ? {
                        ...destination,
                        custos: destination.custos.map(custo =>
                            custo.idTipoCusto === idTipoCusto
                                ? { ...custo, ValorCustoDestino: newValue }
                                : custo
                        )
                    }
                    : destination
            )
        }));
    }

    return (
        <>
            <PageHeader title={identifier ? "Editar Viagem" : "Nova Viagem"}>

                <div className="row justify-content-end">
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={saveTravel} disabled={processing || importing}>
                            {processing ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" /> : <IconCheck stroke={1} />}
                            {processing ? (identifier ? "Salvando..." : "Cadastrando...") : (identifier ? "Salvar Alterações" : "Cadastrar")}
                        </button>
                    </div>
                </div>

            </PageHeader>

            <div className="row mb-3">
                <div className="col">
                    <div className="card border-primary">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h6 className="card-title text-uppercase mb-0">
                                        <IconBuildingAirport className="me-2" size={36} stroke={1} />
                                        Origem
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">

                                <div className="col-12 col-lg mb-3 mb-lg-0">
                                    <label className="form-label required" htmlFor="nameInput">Unidade Federativa:</label>
                                    <select
                                        className="form-select"
                                        disabled={importingFederativeUnits}
                                        value={federativeUnitID}
                                        onChange={(e) => {

                                            setFederativeUnitID(e.target.value);
                                            setTravel(_ => ({ ..._, idMunicipioSaida: null }))

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
                                    <label className="form-label required" htmlFor="nameInput">Cidade:</label>
                                    <select
                                        className="form-select"
                                        disabled={federativeUnitID == null || importingCities}
                                        value={travel.idMunicipioSaida}
                                        onChange={(e) => {

                                            setTravel(_ => ({ ..._, idMunicipioSaida: e.target.value }))

                                        }}
                                    >
                                        {importingCities == false && travel.idMunicipioSaida == null && <option selected disabled label="Selecionar Cidade..." />}
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

                            <div className="row">
                                <div className="col">
                                    <label className="form-label required" htmlFor="nameInput">Data Inicio:</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="col">
                                    <label className="form-label required" htmlFor="nameInput">Data Final:</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {travel.destinos.map((destination, index) => (
                <div className="row mb-3" key={index} ref={index === travel.destinos.length - 1 ? lastDestinationRef : null}>
                    <div className="col">
                        <TravelDestination
                            {...destination}
                            index={index}
                            updateDestination={updateDestination}
                            updateCost={updateCost}
                            removeDestination={removeDestination}
                        />
                    </div>
                </div>
            ))}


            <div className="row justify-content-center">
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addDestination} disabled={travel.destinos.length >= 5}>
                        <IconPlus className="icon" stroke={1} />
                        Adicionar Destino {travel.destinos.length >= 5 && <small>( Limite Atingido )</small>}
                    </button>
                </div>
            </div>

        </>
    );
}
