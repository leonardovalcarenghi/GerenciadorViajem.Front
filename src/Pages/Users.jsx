import { IconPlus, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react"
import PageHeader from "./Components/Header";
import { GetUsers } from "../Services/Users";
import Spinner from "./Components/Spinner";
import UserModal from "../Modals/Users/User";

export default function UsersPage() {

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
                <button type="button" className="btn btn-primary" onClick={openModal}>
                    <IconPlus stroke={1} />
                    Novo
                </button>
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
                                                                        <span className="d-inline-block">{user.nomeEmpregado}</span>
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
                                                                        <li><a className="dropdown-item" onClick={() => { setUserID(user.idEmpregado); setShowModal(true) }}>Editar</a></li>
                                                                        <li><a className="dropdown-item" onClick={() => setUserID(user.idEmpregado)}>Excluir</a></li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <UserModal
                identifier={userID}
                show={showModal}
                setShow={setShowModal}
                onSuccess={() => {
                    alert(userID ? "O usuário foi alterado com êxito" : "O usuário foi criado com êxito.");
                    getUsers();
                }}
                onClose={() => {
                    setUserID(null);
                }}
            />
        </>
    )
}