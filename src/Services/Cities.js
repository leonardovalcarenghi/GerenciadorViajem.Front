import axios from 'axios';

/**
 * Cadastrar nova cidade.
 * @param {*} data Modelo.
 * @returns 
 */
export const NewJob = (data = {}) => axios.post('/municipio/cadastrar', data);

/**
 * Editar cidade.
 * @param {*} id Identificador da cidade.
 * @param {*} data Modelo.
 * @returns 
 */
export const EditJob = (id = 0, data = {}) => axios.put(`/municipio/${id}`, data);

/**
 * Excluir cidade.
 * @param {*} id Identificador da cidade.
 * @returns 
 */
export const DeleteJob = (id = 0) => axios.delete(`/municipio/${id}`);

/**
 * Obter uma cidade específica.
 * @param {*} id Identificador da cidade.
 * @returns 
 */
export const GetCity = (id = 0) => axios.get(`/municipio/${id}`);

/**
 * Obter todas as cidades cadastradas.
 * @returns 
 */
export const GetCities = () => axios.get('/municipio/listar');
