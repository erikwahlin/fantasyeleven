import axios from 'axios';
import backend from './backend';

const backendColors = {
    dev: 'purple',
    undefined: 'purple',
    local: 'green',
    test: 'pink'
};

const backendColor = backendColors[process.env.REACT_APP_BACKEND_BRANCH];

console.log(
    `Running backend branch %c ${process.env.REACT_APP_BACKEND_BRANCH}`,
    `color: ${backendColor}; border: white solid 1px; padding: 5px;`,
    `\n @ ${backend(process.env.REACT_APP_BACKEND_BRANCH)}`
);

const api = axios.create({
    baseURL: backend(process.env.REACT_APP_BACKEND_BRANCH)
});

export const get = (action = 'getMany', id = '') => api.get(`/${action}/${id}`);
export const create = (action = 'create', payload) => api.post(`/${action}`, payload);

export const remove = id => api.delete(`/remove/${id}`);
export const update = (id, payload) => api.put(`/update/${id}`, payload);

const missingAction = crudType =>
    console.log(`Api-fail. No action-name provided for ${crudType}-action.`);

const apis = {
    create: ({ action, payload }) =>
        action ? api.post(`/${action}`, payload) : missingAction('create/post'),

    read: ({ action, _id }) =>
        action ? api.get(`/${action}${_id ? `/${_id}` : ``}`) : missingAction('read/get'),

    update: ({ action, payload, _id }) =>
        action
            ? api.put(`/${action}${_id ? `/${_id}` : ``}`, payload)
            : missingAction('update/put'),

    delete: ({ action, _id }) =>
        action && _id ? api.delete(`/${action}/${_id}`) : missingAction('delete')
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
