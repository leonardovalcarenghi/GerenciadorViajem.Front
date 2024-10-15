import { useEffect, useState } from "react";
import { GetCities } from "../Services/Cities";
import { GetJobs } from "../Services/Jobs";
import { GetUsers } from "../Services/Users";
import PageHeader from "../Components/Header";

export default function HomePage() {

    const [dashboard, setDashboard] = useState({ users: 0, jobs: 0, cities: 0 });

    useEffect(() => { getDashboard() }, []);

    async function getDashboard() {

        // const users = await GetUsers()?.length || 0;
        // const jobs = await GetJobs()?.length || 0;
        // const cities = await GetCities()?.length || 0;

        // setDashboard({ users, jobs, cities });

    }

    return (
        <>
            <PageHeader title="Início" />


            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="card text-white bg-primary mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Usuários</h5>
                            <p class="card-text">{dashboard.users}</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card text-white bg-success mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Cargos</h5>
                            <p class="card-text">{dashboard.jobs}</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card text-white bg-warning mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Viagens</h5>
                            <p class="card-text">15</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card text-white bg-danger mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Cidades</h5>
                            <p class="card-text">{dashboard.cities}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Gráfico de Vendas</h5>
                            <p class="card-text">Aqui pode inserir um gráfico usando uma biblioteca de JavaScript.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Últimos Comentários</h5>
                            <p class="card-text">Exemplo de lista de comentários recentes.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-4">
                <h5>Progresso dos Projetos</h5>
                <div className="progress mb-3">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "70%" }}
                        aria-valuenow={70}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        70%
                    </div>
                </div>
                <div className="progress mb-3">
                    <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        50%
                    </div>
                </div>
                <div className="progress mb-3">
                    <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "30%" }}
                        aria-valuenow={30}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        30%
                    </div>
                </div>
            </div>





        </>
    );
}