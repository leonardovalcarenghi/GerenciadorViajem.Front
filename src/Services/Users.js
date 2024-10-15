import axios from "axios";

/**
 * Cadastrar novo usuário.
 * @param {*} data Modelo.
 * @returns 
 */
export const NewUser = (data = {}) => axios.post("/empregado/cadastrar", data);

/**
 * Editar usuário.
 * @param {*} id Identificador do usuário.
 * @param {*} data Modelo.
 * @returns 
 */
export const EditUser = (id = 0, data = {}) => axios.put(`/empregado/${id}`, data);

/**
 * Excluir usuário.
 * @param {*} id Identificador do usuário.
 * @returns 
 */
export const DeleteUser = (id = 0) => axios.delete(`/empregado/${id}`);

/**
 * Obter um usuário específico.
 * @param {*} id Identificador do usuário.
 * @returns 
 */
export const GetUser = (id = 0) => axios.get(`/empregado/${id}`);

/**
 * Obter todos os usuários cadastrados.
 * @returns 
 */
export const GetUsers = () => axios.get('/empregado/listar')


/**
 * Obter o usuário atualmente logado.
 * @returns 
 */
export const GetActualUser = async () => {

    const response = await axios.get('auth/success');
    return response?.user;

};