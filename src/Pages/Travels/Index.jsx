import { useContext, useEffect, useState } from "react";
import PageHeader from "../../Components/Header";
import { IconChartPie, IconCheck, IconClipboardCheck, IconPencil, IconPlaneTilt, IconPlus, IconTrack, IconTrash, IconUser, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { GetTravels } from "../../Services/Travels";
import { GetUsers } from "../../Services/Users";
import Spinner from "../../Components/Spinner";

export default function Travels_IndexPage() {

    const actualUser = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    const [travels, setTravels] = useState([]);
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState(null);

    const [importingTravels, setImportingTravels] = useState(false);
    const [importingUsers, setImportingUsers] = useState(false);

    const [errorOnImportTravels, setErrorOnImportTravels] = useState();
    const [errorOnImportUsers, setErrorOnImportUsers] = useState();

    const TRAVEL_STATUS_COLOR = Object.freeze({
        "Pendente": "bg-secondary",
        "Status da viagem não encontrado": "bg-dark"
    })

    useEffect(() => { if (actualUser) { setIsAdmin(actualUser.cargo.idCargo == 1); } }, [actualUser]);

    useEffect(() => { if (actualUser && isAdmin) { getUsers() } else { setUserID(actualUser?.idEmpregado) } }, [isAdmin]);

    useEffect(() => { if (userID) { getTravels() } }, [userID]);


    async function getTravels() {
        setImportingTravels(true);
        setErrorOnImportTravels(null);

        try {

            const result = await GetTravels(userID);
            setTravels(result.viagens);
        }
        catch (error) {
            setErrorOnImportTravels(error?.response?.data?.message || error.message);
        }

        setImportingTravels(false);
    }

    async function getUsers() {
        setImportingUsers(true);
        setErrorOnImportUsers(null);

        try {
            const result = await GetUsers();
            setUsers(result);
        }
        catch (error) {
            setErrorOnImportUsers(error?.response?.data?.message || error.message);
        }

        setImportingUsers(false);
    }

    return (
        <>

            <PageHeader title="Viagens" titleRow>
                <div className="row justify-content-end">

                    {
                        actualUser?.cargo?.idCargo == 1 &&
                        <div className="col col-lg-5">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    <IconUser stroke={1} size={26} />
                                </span>
                                <select className="form-select" value={userID} onChange={({ target }) => setUserID(target.value)}>
                                    {importingUsers == false && userID == null && <option selected disabled label="Selecionar usuário..." />}
                                    {importingUsers && <option selected disabled label="Carregando..." />}
                                    {users.map(user => <option key={user.idEmpregado} value={user.idEmpregado} label={user.nomeEmpregado} />)}
                                </select>
                            </div>
                        </div>
                    }

                    <div className="col-auto">
                        <Link className="btn btn-primary" to={"/viagens/novo"}>
                            <IconPlus stroke={1} />
                            Nova Viagem
                        </Link>
                    </div>
                </div>

            </PageHeader>

            {/* DASHBOARD */}

            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <IconChartPie size={56} className="me-3" />
                                <div>
                                    <h5 className="card-title mb-0">Total</h5>
                                    <p className="card-text fs-4">{0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <IconCheck size={56} className="me-3" />
                                <div>
                                    <h5 className="card-title mb-0">Aprovadas</h5>
                                    <p className="card-text fs-4">{0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <IconX size={56} className="me-3" />
                                <div>
                                    <h5 className="card-title mb-0">Rejeitadas</h5>
                                    <p className="card-text fs-4">{0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <IconClipboardCheck size={56} stroke={1.5} className="me-3" />
                                <div>
                                    <h5 className="card-title mb-0">Concluídas</h5>
                                    <p className="card-text fs-4">{0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LISTAGEM */}
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {
                                (userID == null && isAdmin) ?
                                    <>
                                        <p className="mb-0">Selecione um usuário para importar suas viagens...</p>
                                    </>
                                    :
                                    importingTravels ? <Spinner /> :
                                        errorOnImportTravels ?
                                            <>
                                                <h6 className="mb-0">Erro:</h6>
                                                <p className="mb-0">{errorOnImportTravels}</p>
                                            </>
                                            :
                                            travels.length == 0 ?
                                                <>
                                                    <p className="mb-0">Nenhuma viagem disponível.</p>
                                                </>
                                                :
                                                <div className="table-responsive-lg">
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="small text-muted text-uppercase">Origem</th>
                                                                <th scope="col" className="small text-muted text-uppercase text-center">Nº Destinos</th>
                                                                <th scope="col" className="small text-muted text-uppercase text-center">Data Inicio</th>
                                                                <th scope="col" className="small text-muted text-uppercase text-center">Data Final</th>
                                                                <th scope="col" className="small text-muted text-uppercase text-center">Custo Total</th>
                                                                <th scope="col" className="small text-muted text-uppercase text-center">Status</th>
                                                                <th scope="col" />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                travels.map(travel =>
                                                                    <tr key={travel.idViagem} travel-id={travel.idViagem}>

                                                                        {/* Origem */}
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <IconPlaneTilt stroke={1} size={38} />
                                                                                <div className="position-relative d-flex flex-column ms-2">
                                                                                    <span className="d-inline-block">{travel.municipioSaida.nome}</span>
                                                                                    <small className="text-muted">{travel.municipioSaida.unidadeFederativa.NomeUnidadeFederativa}</small>
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        {/* Destinos */}
                                                                        <td className="text-center">{travel.destinos.length}</td>

                                                                        {/* Data Início */}
                                                                        <td className="text-center">{travel.DataInicioViagem}</td>

                                                                        {/* Data Final */}
                                                                        <td className="text-center">{travel.DataTerminoViagem}</td>

                                                                        {/* Custo Total */}
                                                                        <td className="text-center">nao implementado</td>

                                                                        {/* Status */}
                                                                        <td className="text-center">
                                                                            <span className={`badge rounded-pill ${TRAVEL_STATUS_COLOR[travel.statusViagem]}`}>{travel.statusViagem}</span>
                                                                        </td>

                                                                        {/* Opções */}
                                                                        <td className="text-end">

                                                                            <div className="d-flex d-lg-none">

                                                                                <Link class="btn btn-outline-secondary px-2 rounded-5 me-1" to={`/viagens/editar/${travel.idViagem}`}>
                                                                                    <IconPencil className="px-0 mx-0" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                </Link>

                                                                                <button class="btn btn-outline-secondary px-2 rounded-5" >
                                                                                    <IconTrash className="px-0 mx-0" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                </button>
                                                                            </div>

                                                                            <div class="dropdown d-none d-lg-block">
                                                                                <button class="btn btn-sm dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" />
                                                                                <ul class="dropdown-menu dropdown-menu-end">
                                                                                    <li>
                                                                                        <h5 className=" dropdown-header">Viagem</h5>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link class="dropdown-item" to={`/viagens/editar/${travel.idViagem}`}>
                                                                                            <IconPencil className="icon me-2" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                            Editar
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a class="dropdown-item" href="#">
                                                                                            <IconTrash className="icon me-2" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                            Excluir
                                                                                        </a>
                                                                                    </li>
                                                                                    {
                                                                                        isAdmin &&
                                                                                        <li>
                                                                                            <div className=" dropdown-divider" />
                                                                                            <h5 className=" dropdown-header">Aprovação</h5>
                                                                                            <li>
                                                                                                <a class="dropdown-item" href="#">
                                                                                                    <IconCheck className="icon me-2" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                                    Aprovar
                                                                                                </a>
                                                                                                <a class="dropdown-item" href="#">
                                                                                                    <IconX className="icon me-2" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                                    Rejeitar
                                                                                                </a>
                                                                                            </li>
                                                                                        </li>
                                                                                    }                                                                                  
                                                                                </ul>
                                                                            </div>
                                                                        </td>

                                                                    </tr>

                                                                )
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}