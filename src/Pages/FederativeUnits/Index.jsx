import { useEffect, useState } from "react";
import PageHeader from "../../Components/Header";
import { IconMap, IconPlus } from "@tabler/icons-react";
import { GetFederativeUnits } from "../../Services/FederativeUnits";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";

export default function FederativeUnits_IndexPage() {

    const [units, setUnits] = useState([]);
    const [unitID, setUnitID] = useState([]);

    const [importingUnits, setImportingUnits] = useState(false);
    const [errorOnImport, setErrorOnImport] = useState();

    useEffect(() => { getUnits(); }, []);

    async function getUnits() {
        setImportingUnits(true);
        setErrorOnImport(null);

        try {
            const result = await GetFederativeUnits();
            setUnits(result);
        } catch (error) {
            setErrorOnImport(error?.response?.data?.message || error.message);
        }

        setImportingUnits(false);
    }

    return (
        <>
            <PageHeader title="Unidades Federativas">
                <Link className="btn btn-primary" to={"/unidades-federativas/novo"}>
                    <IconPlus stroke={1} />
                    Nova Unidade Federativa
                </Link>
            </PageHeader>


            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {
                                importingUnits ? <Spinner /> :
                                    errorOnImport ?
                                        <>
                                            <h6 className="mb-0">Erro:</h6>
                                            <p className="mb-0">{errorOnImport}</p>
                                        </>
                                        :
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="small text-muted text-uppercase">Unidade</th>
                                                        <th scope="col" className="small text-muted text-uppercase text-center">Status</th>
                                                        <th scope="col" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        units.map(unit =>
                                                            <tr key={unit.idUnidadeFederativa} unit-id={unit.idUnidadeFederativa}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <IconMap stroke={1} size={38} />
                                                                        <div className="position-relative d-flex flex-column ms-2">
                                                                            <Link to={`/unidades-federativas/editar/${unit.idUnidadeFederativa}`}>
                                                                                <span className="d-inline-block">{unit.NomeUnidadeFederativa}</span>
                                                                            </Link>
                                                                            <small className="text-muted">{unit.SiglaUnidadeFederativa}</small>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="text-center">
                                                                    {unit.ativo ? "Ativo" : "Inativo"}
                                                                </td>

                                                                <td className="text-end">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-sm dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" />
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link className="dropdown-item" to={`/unidades-federativas/editar/${unit.idUnidadeFederativa}`}>
                                                                                    Editar
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <a className="dropdown-item" onClick={() => setUnitID(unit.idCargo)}>Excluir</a>
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
    );
}