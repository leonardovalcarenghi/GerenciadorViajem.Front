import { useNavigate, useParams } from "react-router-dom";
import { TRAVEL } from "../../Models/Travel";
import { GetTravel } from "../../Services/Travels";
import { useEffect, useState } from "react";
import PageHeader from "../../Components/Header";
import { IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";

export default function Travels_FormPage() {

    const { identifier } = useParams();
    const navigate = useNavigate();

    const [travel, setTravel] = useState(TRAVEL);

    const [importing, setImporting] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [errorOnImport, setErrorOnImport] = useState(false);
    const [errorOnProcess, setErrorOnProcess] = useState(false);

    useEffect(() => { getTravel(); }, [identifier]);

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

    }

    function addDestination() {

        const destination = {
            "idMunicipioDestino": 101,
            "DataDestinoViagem": "2024-01-05",
            "custo": {
                "idTipoCusto": 1,
                "ValorCustoDestino": 150.5
            }
        }

        setTravel(_ => ({ ..._, destinos: [..._.destinos, destination] }))
    }

    function removeDestination(destination) {

        const dest = travel.destinos.find(destination);
        console.log('dest>>>>>>>>>>>>>>>>>', dest);
    }

    return (
        <>
            <PageHeader title={identifier ? "Editar Viagem" : "Nova Viagem"}>

                <button type="button" className="btn btn-primary" onClick={saveTravel} disabled={processing || importing}>
                    {processing ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" /> : <IconCheck stroke={1} />}
                    {processing ? (identifier ? "Salvando..." : "Cadastrando...") : (identifier ? "Salvar Alterações" : "Cadastrar")}
                </button>

            </PageHeader>

            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h6 className="card-title text-uppercase mb-0">Origem</h6>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-sm float-end px-2" onClick={addDestination}>
                                        <IconPlus className="icon" stroke={1} />
                                        Adicionar Destino
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">




                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label required" htmlFor="nameInput">Unidade Federativa:</label>
                                    <select className="form-control"></select>
                                </div>
                                <div className="col">
                                    <label className="form-label required" htmlFor="nameInput">Cidade:</label>
                                    <select className="form-control"></select>
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


            {
                travel.destinos.map(destination =>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="card-title text-uppercase mb-0">Destino 01</h6>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="btn btn-sm float-end px-2" onClick={() => removeDestination(destination)}>
                                                <IconTrash className="icon" stroke={1} />
                                                Remover Destino
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">



                                    {/* Origem */}
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label required" htmlFor="nameInput">Unidade Federativa:</label>
                                            <select className="form-control"></select>
                                        </div>
                                        <div className="col">
                                            <label className="form-label required" htmlFor="nameInput">Cidade:</label>
                                            <select className="form-control"></select>
                                        </div>
                                    </div>

                                    <div className="row mb-lg-3">
                                        <div className="col">
                                            <label className="form-label required" htmlFor="nameInput">Data:</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>


                                    {/* Custos */}
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <h6 className=" text-uppercase">Custos</h6>
                                        </div>
                                        <div className="col">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            Passagem
                                                        </td>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="R$ 0,00" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Alimentação
                                                        </td>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="R$ 0,00" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Hospedagem
                                                        </td>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="R$ 0,00" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Transporte
                                                        </td>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="R$ 0,00" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


        </>
    )

}