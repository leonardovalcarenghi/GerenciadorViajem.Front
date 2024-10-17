import { IconPencil, IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react"
import PageHeader from "../../Components/Header";
import { GetUsers } from "../../Services/Users";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";

export default function Users_IndexPage() {

    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [importingUsers, setImportingUsers] = useState(false);
    const [errorOnImport, setErrorOnImport] = useState();

    useEffect(() => { getUsers(); }, []);

    async function getUsers() {
        setImportingUsers(true);
        setErrorOnImport(null);

        try {
            const result = await GetUsers();
            setUsers(result);
        } catch (error) {
            setErrorOnImport(error?.response?.data?.message || error.message);
        }

        setImportingUsers(false);
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <PageHeader title="Usuários">

                <div className="row justify-content-end">
                    <div className="col-auto">
                        <Link className="btn btn-primary" to={"/usuarios/novo"}>
                            <IconPlus stroke={1} />
                            Novo Usuário
                        </Link>
                    </div>
                </div>


            </PageHeader>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {
                                importingUsers ? <Spinner /> :
                                    errorOnImport ?
                                        <>
                                            <h6 className="mb-0">Erro:</h6>
                                            <p className="mb-0">{errorOnImport}</p>
                                        </>
                                        :

                                        <div className="table-responsive-lg">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="small text-muted text-uppercase">Usuário</th>
                                                        <th scope="col" className="small text-muted text-uppercase text-center">Cargo</th>
                                                        <th scope="col" className="small text-muted text-uppercase text-center">Status</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        users.map(user =>
                                                            <tr key={user.idEmpregado} user-id={user.idEmpregado}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <IconUser stroke={1} size={38} />
                                                                        <div className="position-relative d-flex flex-column ms-2">
                                                                            <Link to={`/usuarios/editar/${user.idEmpregado}`}>
                                                                                <span className="d-inline-block">{user.nomeEmpregado}</span>
                                                                            </Link>
                                                                            <small className="text-muted">{user.email}</small>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="text-center">
                                                                    {user.cargo?.nomeCargo}
                                                                </td>

                                                                <td className="text-center">
                                                                    {user.ativo ? "Ativo" : "Inativo"}
                                                                </td>

                                                                <td className="text-end">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-sm dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" />
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link className="dropdown-item" to={`/usuarios/editar/${user.idEmpregado}`}>
                                                                                    <IconPencil className="icon me-2" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                    Editar
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <a className="dropdown-item">
                                                                                    <IconTrash className="icon me-2" stroke={1} size={18} style={{ marginTop: "-4px" }} />
                                                                                    Excluir
                                                                                </a>
                                                                            </li>
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
    )
}