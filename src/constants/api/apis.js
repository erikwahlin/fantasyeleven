import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api' //process.env.REACT_APP_BACKEND_URL
});

export const get = (action = 'getMany', id = '') => api.get(`/${action}/${id}`);
export const create = payload => api.post(`/create`, payload);

export const remove = id => api.delete(`/remove/${id}`);
export const update = (id, payload) => api.put(`/update/${id}`, payload);

//export const getResult = id => api.post(`/getResult/${id}`);

const apis = {
    get,
    create,
    remove,
    update

    //getResult
};

export default apis;
