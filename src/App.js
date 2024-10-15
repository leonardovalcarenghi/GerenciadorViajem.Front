import logo from './logo.svg';
import './App.css';
import Header from './App/Header';
import { RouterProvider } from 'react-router-dom';
import { PrivateRoutes } from './Routes/Private.Routes';
import { UserContext } from './Contexts/UserContext';
import { useEffect, useState } from 'react';
import { GetActualUser } from './Services/Users';
import { PublicRoutes } from './Routes/Public.Routes';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = 'https://gerenciadorviajem.onrender.com/api/v1';

  axios.interceptors.response.use(
    (response) => {
      // Se a resposta for bem-sucedida, retornar os dados
      return response ? (response?.data || response) : null;
    },
    (error) => {

      // Verifica se o status é 401 (não autorizado)      
      if (error.response && error.response.status === 401) {
  
        delete localStorage["authorization"];
        sessionStorage["authorizationExpired"] = "authorizationExpired";
        const redirectTo = encodeURIComponent(window.location.pathname)
        window.location.href = `/login?redirectTo=${redirectTo}`;
         
      }

      // Retorna a Promise rejeitada para que outros handlers possam manipular o erro
      return Promise.reject(error);
    }
  );

  const [user, setUser] = useState(null);
  const [authorization, setAuthorization] = useState(localStorage["authorization"]);

  if (authorization) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authorization}`;
  }

  useEffect(() => { if (authorization) { getUser() } }, []);

  async function getUser() {

    const result = await GetActualUser();
    setUser(result);

  }

  return (
    <>
      <UserContext.Provider value={user}>
        <RouterProvider router={authorization ? PrivateRoutes : PublicRoutes} />
      </UserContext.Provider>
    </>
  );
}

export default App;
