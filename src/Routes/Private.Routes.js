import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import HomePage from "../Pages/Home";

import TravelsPage from "../Pages/Travels";
import JobsPage from "../Pages/Jobs";
import FederativeUnitsPage from "../Pages/FederativeUnits";
import ReportPage from "../Pages/Reports";
import CitiesPage from "../Pages/Cities";


import Users_Index from "../Pages/Users/Index";
import Users_Form from "../Pages/Users/Form";


export const PrivateRoutes = createBrowserRouter([

    {
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },

            // Usuários
            {
                path: "/usuarios",
                element: <Users_Index />
            },
            {
                path: "/usuarios/novo",
                element: <Users_Form />
            },
            {
                path: "/usuarios/editar/:identifier",
                element: <Users_Form />
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