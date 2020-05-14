import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL //'http://localhost:5000/api'
});

export const get = (action = 'getMany', id = '') => api.get(`/${action}/${id}`);
export const create = (action = 'create', payload) => api.post(`/${action}`, payload);

export const remove = id => api.delete(`/remove/${id}`);
export const update = (id, payload) => api.put(`/update/${id}`, payload);

const rounds = {
    updateRound: round => api.put(`/updateRound`, round)
};

const result = {};

const players = {
    getPlayers: () => api.get(`/getPlayers`),
    addPlayer: player => api.post(`/addPlayer`, player),
    updatePlayer: player => api.put(`/updatePlayer`, player),
    deletePlayer: id => api.delete(`/deletePlayer/${id}`)
};

const missingAction = crudType =>
    console.log(`Api-fail. No action-name provided for ${crudType}-action.`);

const apis = {
    /* get,
    create,
    remove,
    update,

    rounds,
    result,
    players, */

    create: ({ action, payload }) =>
        action ? api.post(`/${action}`, payload) : missingAction('create/post'),

    read: ({ action, _id }) =>
        action ? api.get(`/${action}${_id ? `/${_id}` : ``}`) : missingAction('read/get'),

    update: ({ action, payload, _id }) =>
        action
            ? api.put(`/${action}${_id ? `/${_id}` : ``}`, payload)
            : missingAction('update/put'),

    delete: ({ action, _id }) =>
        action && _id ? api.post(`/${action}/${_id}`) : missingAction('delete')
};

export default apis;

/* 
* API funcs
// users
createUser,
updateUser,
deleteUser,
readUser,
readUsers,

// rounds
readRounds,
createRound,
updateRound,
deleteRound,

// result
returnResult,
storeResult,
createResult,
readResult,
readUserResult,

// players
readPlayers,
createPlayer,
updatePlayer,
deletePlayer,
********* */
