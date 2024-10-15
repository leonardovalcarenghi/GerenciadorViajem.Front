import { useEffect, useState } from "react";
import { GetCities } from "../Services/Cities";
import { GetJobs } from "../Services/Jobs";
import { GetUsers } from "../Services/Users";
import PageHeader from "../Components/Header";
import { Link } from "react-router-dom";

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
            <PageHeader title="" />


            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Seja bem-vindo(a)!</h5>
                            <p className="card-text">
                                Para gerenciar suas viagens clique no botão abaixo ou acesse diretamente o item no menu superior.
                            </p>
                            <Link to={"/viagens"} className="btn btn-primary">
                                Gerenciar Viagens
                            </Link>
                        </div>
                    </div>
                </div>

            </div>




        </>
    );
}