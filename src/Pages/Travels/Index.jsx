import { useContext, useEffect, useState } from "react";
import PageHeader from "../../Components/Header";
import { IconPencil, IconPlaneTilt, IconPlus, IconTrack, IconTrash, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { GetTravels } from "../../Services/Travels";
import { GetUsers } from "../../Services/Users";

export default function Travels_IndexPage() {

    const user = useContext(UserContext);

    const [travels, setTravels] = useState([]);
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState(null);

    const [importingTravels, setImportingTravels] = useState(false);
    const [importingUsers, setImportingUsers] = useState(false);

    const [errorOnImportTravels, setErrorOnImportTravels] = useState();
    const [errorOnImportUsers, setErrorOnImportUsers] = useState();

    useEffect(() => {
        if (user) {
            setUserID(user.idEmpregado)

            // Buscar usuários se usuário atual for admin:
            if (user.cargo.idCargo == 1 || user.cargo.idCargo == 3)
                getUsers();

        }
    }, [user]);
    useEffect(() => { if (userID) { getTravels() } }, [userID]);

    async function getTravels() {
        setImportingTravels(true);
        setErrorOnImportTravels(null);

        try {

            const result = await GetTravels(userID);
            setTravels(result);
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

            <PageHeader title="Viagens">
                <div className="row justify-content-end">

                    {
                        (user?.cargo?.idCargo == 1 || user?.cargo?.idCargo == 3) &&
                        <div className="col-5">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    <IconUser stroke={1} size={26} />
                                </span>
                                <select className="form-select" value={userID} onChange={({ target }) => setUserID(target.value)}>
                                    <option>teste 1</option>
                                    <option>teste 2</option>
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

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive-lg">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="small text-muted text-uppercase">Destino</th>
                                            <th scope="col" className="small text-muted text-uppercase text-center">Data Inicio</th>
                                            <th scope="col" className="small text-muted text-uppercase text-center">Data Final</th>
                                            <th scope="col" className="small text-muted text-uppercase text-center">Usuário/Empregado</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={1} travel-id={1} user-id={1} origin-city-id={1}>

                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <IconPlaneTilt stroke={1} size={38} />
                                                    <div className="position-relative d-flex flex-column ms-2">
                                                        <span className="d-inline-block">Destino</span>
                                                        <small className="text-muted">leonardo.valcarenghi@gmail.com</small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="text-center">01/01/9999</td>
                                            <td className="text-center">01/01/9999</td>
                                            <td className="text-center">Leonardo Valcarenghi</td>

                                            <td className="text-end">

                                                <div className="d-flex d-lg-none">

                                                    <Link class="btn btn-outline-secondary px-2 rounded-5 me-1" to={`/viagens/editar/${"123"}`}>
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
                                                            <Link class="dropdown-item" to={`/viagens/editar/${"123"}`}>
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
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}