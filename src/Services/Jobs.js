import axios from 'axios';

/**
 * Cadastrar novo cargo.
 * @param {*} data Modelo.
 * @returns 
 */
export const NewJob = (data = {}) => axios.post('/cargo/cadastrar', data);

/**
 * Editar cargo.
 * @param {*} id Identificador do cargo.
 * @param {*} data Modelo.
 * @returns 
 */
export const EditJob = (id = 0, data = {}) => axios.put(`/cargo/${id}`, data);

/**
 * Excluir cargo.
 * @param {*} id Identificador do cargo.
 * @returns 
 */
export const DeleteJob = (id = 0) => axios.delete(`/cargo/${id}`);

/**
 * Obter um cargo específico.
 * @param {*} id Identificador do cargo.
 * @returns 
 */
export const GetJob = (id = 0) => axios.get(`/cargo/${id}`);

/**
 * Obter todos os cargos cadastrados.
 * @returns 
 */
export const GetJobs = () => axios.get('/cargo/listar');
