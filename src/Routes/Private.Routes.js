import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import HomePage from "../Pages/Home";

import TravelsPage from "../Pages/Travels";
import JobsPage from "../Pages/Jobs";

import ReportPage from "../Pages/Reports";
import CitiesPage from "../Pages/Cities";

// Usuários
import Users_Index from "../Pages/Users/Index";
import Users_Form from "../Pages/Users/Form";

// Unidades Federativas
import FederativeUnits_Index from "../Pages/FederativeUnits/Index";
import FederativeUnits_Form from "../Pages/FederativeUnits/Form";


export const PrivateRoutes = createBrowserRouter([

    {
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },

            // Usuários ----------------------------------------------------
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

            // Unidades Federativas --------------------------------------------
            {
                path: "/unidades-federativas",
                element: <FederativeUnits_Index />
            },
            {
                path: "/unidades-federativas/novo",
                element: <FederativeUnits_Form />
            },
            {
                path: "/unidades-federativas/editar/:identifier",
                element: <FederativeUnits_Form />
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