import { useEffect, useState } from "react";
import { GetCities } from "../../Services/Cities";
import PageHeader from "../../Components/Header";
import { IconBuilding, IconBuildingAirport, IconBuildingArch, IconBuildingBank, IconBuildingBridge, IconBuildingCommunity, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";

export default function Cities_IndexPage() {

    const [cities, setCities] = useState([]);
    const [cityID, setCityID] = useState(null);

    const [importingCities, setImportingCities] = useState(false);
    const [errorOnImport, setErrorOnImport] = useState();

    useEffect(() => { getCities() }, []);

    async function getCities() {
        setImportingCities(true);
        setErrorOnImport(null);

        try {
            const result = await GetCities();
            setCities(result);
        } catch (error) {
            setErrorOnImport(error?.response?.data?.message || error.message);
        }

        setImportingCities(false);
    }

    return (
        <>

            <PageHeader title="Cidades">

                <div className="row justify-content-end">
                    <div className="col-auto">
                        <Link className="btn btn-primary" to={"/cidades/novo"}>
                            <IconPlus stroke={1} />
                            Nova Cidade
                        </Link>
                    </div>
                </div>

            </PageHeader>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {
                                importingCities ? <Spinner /> :
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
                                                        cities.map(city =>
                                                            <tr key={city.idMunicipio} city-id={city.idMunicipio} unit-id={city.idUnidadeFederativa}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <IconBuildingCommunity stroke={1} size={38} />
                                                                        <div className="position-relative d-flex flex-column ms-2">
                                                                            <Link className="btn btn-primary" to={`/cidades/editar/${city.idMunicipio}`}>
                                                                                <span className="d-inline-block">{city.NomeMunicipio}</span>
                                                                                /=</Link>
                                                                            <small className="text-muted">{city.unidadeFederativa?.NomeUnidadeFederativa}</small>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="text-center">
                                                                    {city.ativo ? "Ativo" : "Inativo"}
                                                                </td>

                                                                <td className="text-end">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-sm dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" />
                                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                                            <li>
                                                                                <Link className="dropdown-item" to={`/cidades/editar/${city.idMunicipio}`}>
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