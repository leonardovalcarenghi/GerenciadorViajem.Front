import axios from "axios";

/**
 * Cadastrar novo viagem.
 * @param {*} data Modelo.
 * @returns 
 */
export const NewTravel = (data = {}) => axios.post("/viagens", data);

/**
 * Editar viagem.
 * @param {*} id Identificador da viagem.
 * @param {*} data Modelo.
 * @returns 
 */
export const EditTravel = (id = 0, data = {}) => axios.put(`/viagens/${id}`, data);

/**
 * Excluir viagem.
 * @param {*} id Identificador da viagem.
 * @returns 
 */
export const DeleteTravel = (id = 0) => axios.delete(`/viagens/${id}`);

/**
 * Obter uma viagem.
 * @param {*} id Identificador da viagem.
 * @returns 
 */
export const GetTravel = (id = 0) => axios.get(`/viagens/${id}`);

/**
 * Obter todos as viajens cadastrados para um usuário.
 * @param {*} userID Identificador do usuário.
 * @returns 
 */
export const GetTravels = (userID) => axios.get(`/viagens/empregado/${userID}`);

/**
 * Obter PDF da viajem.
 * @param {*} id Identificador da viagem.
 * @returns 
 */
export const GetTravelPDF = (id) => axios.get(`/viagens/${id}/exportar-pdf`);