import { useEffect, useState } from "react";
import PageHeader from "../../Components/Header";
import { IconPencil, IconPlaneTilt, IconPlus, IconTrack, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Travels_IndexPage() {

    const [travels, setTravels] = useState([]);

    useEffect(() => { }, []);

    async function getTravels() {

    }

    return (
        <>

            <PageHeader title="Viagens">
                <Link className="btn btn-primary" to={"/viagens/novo"}>
                    <IconPlus stroke={1} />
                    Nova Viagem
                </Link>
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