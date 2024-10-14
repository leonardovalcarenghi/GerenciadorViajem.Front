import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../Pages/Login";



export const PublicRoutes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "*",
        element: <Navigate to={"/login"} />
    }
]);