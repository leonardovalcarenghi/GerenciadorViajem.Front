import axios from 'axios';

/**
 * Cadastrar nova unidade federativa.
 * @param {*} data Modelo.
 * @returns 
 */
export const NewJob = (data = {}) => axios.post('/unidadeFederativa/cadastrar', data);

/**
 * Editar unidade federativa.
 * @param {*} id Identificador da unidade.
 * @param {*} data Modelo.
 * @returns 
 */
export const EditJob = (id = 0, data = {}) => axios.put(`/unidadeFederativa/${id}`, data);

/**
 * Excluir unidade federativa.
 * @param {*} id Identificador da unidade.
 * @returns 
 */
export const DeleteJob = (id = 0) => axios.delete(`/unidadeFederativa/${id}`);

/**
 * Obter uma unidade federativa específica.
 * @param {*} id Identificador da unidade.
 * @returns 
 */
export const GetFederativeUnit = (id = 0) => axios.get(`/unidadeFederativa/${id}`);

/**
 * Obter todas as unidades federativas cadastradas.
 * @returns 
 */
export const GetFederativeUnits = () => axios.get('/unidadeFederativa/listar');
