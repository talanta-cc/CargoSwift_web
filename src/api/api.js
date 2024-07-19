import axios from 'axios';

const BASE_URL = 'https://cargoswift.talantacomputerschool.com/api/cargos';

export const getAvailableCargos = (latitude, longitude) => {
  return axios.get(`${BASE_URL}/home/${latitude}/${longitude}`);
};

export const getUserCargos = (userId) => {
  return axios.get(`${BASE_URL}/cargos-own/${userId}`);
};

export const getTruckerCargos = (userId) => {
  return axios.get(`${BASE_URL}/trucker-cargos/${userId}`);
};

export const addCargo = (cargoData) => {
  return axios.post(`${BASE_URL}/add`, cargoData);
};
