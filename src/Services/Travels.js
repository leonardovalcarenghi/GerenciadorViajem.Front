import axios from "axios";

/**
 * Cadastrar novo viagem.
 * @param {*} data Modelo.
 * @returns 
 */
export const NewTravel = (data = {}) => axios.post("/viagem/cadastrar", data);

/**
 * Editar viagem.
 * @param {*} id Identificador da viagem.
 * @param {*} data Modelo.
 * @returns 
 */
export const EditTravel = (id = 0, data = {}) => axios.put(`/viagem/atualizar/${id}`, data);

/**
 * Excluir viagem.
 * @param {*} id Identificador da viagem.
 * @returns 
 */
export const DeleteTravel = (id = 0) => axios.delete(`/viagem/excluir/${id}`);

/**
 * Obter uma viagem.
 * @param {*} id Identificador da viagem.
 * @returns 
 */
export const GetTravel = (id = 0) => axios.get(`/viagem/listar/${id}`);

/**
 * Obter todos as viajens cadastrados para um usuário.
 * @returns 
 */
export const GetTravels = (userId) => axios.get(`/viagem/listar/${userId}`);

/**
 * Obter PDF da viajem.
 * @param {*} id Identificador da viagem.
 * @returns 
 */
export const GetTravelPDF = (id) => axios.get(`/viagem/exportar-pdf/${id}`);