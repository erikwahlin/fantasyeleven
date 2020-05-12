import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL //'http://localhost:5000/api'
});

export const get = (action = 'getMany', id = '') => api.get(`/${action}/${id}`);
export const create = (action = 'create', payload) => api.post(`/${action}`, payload);

export const remove = id => api.delete(`/remove/${id}`);
export const update = (id, payload) => api.put(`/update/${id}`, payload);

const admin = {
    getPlayers: () => api.get(`/getPlayers`),
    addPlayer: player => api.post(`/addPlayer`, player),
    updatePlayer: player => api.put(`/updatePlayer`, player),
    deletePlayer: id => api.delete(`/deletePlayer/${id}`)
};

const apis = {
    get,
    create,
    remove,
    update,
    admin
};

export default apis;
