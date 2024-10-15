import { useEffect, useState } from "react";
import { GetCities } from "../Services/Cities";
import PageHeader from "./Components/Header";
import { IconBuilding, IconBuildingAirport, IconBuildingArch, IconBuildingBank, IconBuildingBridge, IconBuildingCommunity, IconPlus } from "@tabler/icons-react";
import Spinner from "./Components/Spinner";

export default function CitiesPage() {

    const [cities, setCities] = useState([]);
    const [cityID, setCityID] = useState(null);

    const [importingCities, setImportingCities] = useState(false);

    useEffect(() => { getCities() }, []);

    async function getCities() {
        setImportingCities(true);
        const result = await GetCities();
        setCities(result);
        setImportingCities(false);
    }

    return (
        <>

            <PageHeader title="Cidades">
                <button type="button" className="btn btn-primary">
                    <IconPlus stroke={1} />
                    Adicionar
                </button>
            </PageHeader>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {
                                importingCities ? <Spinner /> :
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
                                                                    <span className="d-inline-block">{city.NomeMunicipio}</span>
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
                                                                    <li><a className="dropdown-item" onClick={() => setCityID(city.idMunicipio)}>Editar</a></li>
                                                                    <li><a className="dropdown-item" onClick={() => setCityID(city.idMunicipio)}>Excluir</a></li>
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

        </>
    )

}