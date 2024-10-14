import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import HomePage from "../Pages/Home";
import UsersPage from "../Pages/Users";
import TravelsPage from "../Pages/Travels";
import JobsPage from "../Pages/Jobs";
import FederativeUnitsPage from "../Pages/FederativeUnits";
import ReportPage from "../Pages/Reports";
import CitiesPage from "../Pages/Cities";


export const PrivateRoutes = createBrowserRouter([

    {
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/usuarios",
                element: <UsersPage />
            },
            {
                path: "/viagens",
                element: <TravelsPage />
            },
            {
                path: "/cargos",
                element: <JobsPage />
            },
            {
                path: "/unidades-federativas",
                element: <FederativeUnitsPage />
            },
            {
                path: "/cidades",
                element: <CitiesPage />
            },
            {
                path: "/relatorios",
                element: <ReportPage />
            },
        ]
    }

]);