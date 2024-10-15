import { useEffect, useState } from "react";
import { IconBriefcase2, IconPlus } from "@tabler/icons-react";
import { GetJobs } from "../../Services/Jobs";
import Spinner from "../../Components/Spinner";
import PageHeader from "../../Components/Header";
import { Link } from "react-router-dom";


export default function Jobs_IndexPage() {


    const [jobs, setJobs] = useState([]);
    const [jobID, setJobID] = useState(null);

    const [importingJobs, setImportingJobs] = useState(false);

    useEffect(() => { getJobs(); }, []);

    async function getJobs() {
        setImportingJobs(true);
        const result = await GetJobs();
        setJobs(result);
        setImportingJobs(false);
    }

    return (
        <>
            <PageHeader title="Cargos">
                <Link className="btn btn-primary" to={"/cargos/novo"}>
                    <IconPlus stroke={1} />
                    Novo Cargo
                </Link>
            </PageHeader>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {
                                importingJobs ? <Spinner /> :
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="small text-muted text-uppercase">Cargo</th>
                                                    <th scope="col" className="small text-muted text-uppercase text-center">Status</th>
                                                    <th scope="col" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    jobs.map(job =>
                                                        <tr key={job.idCargo} job-id={job.idCargo}>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <IconBriefcase2 stroke={1} size={38} />
                                                                    <div className="position-relative d-flex flex-column ms-2">
                                                                        <Link to={`/cargos/editar/${job.idCargo}`}>
                                                                            <span className="d-inline-block">{job.nomeCargo}</span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="text-center">
                                                                {job.ativo ? "Ativo" : "Inativo"}
                                                            </td>

                                                            <td className="text-end">
                                                                <div className="dropdown">
                                                                    <button className="btn btn-sm dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" />
                                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                                        <li><Link className="dropdown-item" to={`/cargos/editar/${job.idCargo}`}>Editar</Link></li>
                                                                        <li><a className="dropdown-item" onClick={() => setJobID(job.idCargo)}>Excluir</a></li>
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